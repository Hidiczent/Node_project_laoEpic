import { Op } from "sequelize";
import OTP from "../interface/otp.model";
import OTPMetadata from "../interface/otpMetadata.model";
import { sendOTPEmail } from "../utils/sendEmail";

export class OTPService {
  // ✅ ส่ง OTP พร้อม metadata
  async sendOtpWithMetadata(
    email: string,
    action: string,
    metadata: Record<string, string>
  ) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 นาที

    // 🔁 ลบ OTP เดิมก่อน
    await OTP.destroy({ where: { email, action } });

    await OTP.create({
      email,
      code: otp,
      action,
      expires_at: expiresAt,
      verified: false,
    });

    // 🔁 ลบ metadata เดิม
    await OTPMetadata.destroy({ where: { email, action } });

    // 🔄 บันทึก metadata เป็น key-value
    for (const [key, value] of Object.entries(metadata)) {
      await OTPMetadata.create({
        email,
        action,
        field_key: key,
        field_value: value,
      });
    }

    // ✉️ ส่ง OTP จริง
    await sendOTPEmail(email, otp);
  }

  // ✅ ตรวจสอบ OTP และดึง metadata กลับ
  async verifyOtpAndGetMetadata(
    email: string,
    code: string,
    action: string
  ): Promise<Record<string, string>> {
    const otpEntry = await OTP.findOne({
      where: {
        email,
        code,
        action,
        expires_at: { [Op.gt]: new Date() },
        verified: false,
      },
    });

    if (!otpEntry) {
      throw new Error("Invalid or expired OTP");
    }

    // ✅ อัปเดตสถานะว่า verified แล้ว
    await OTP.update(
      { verified: true, verified_at: new Date() },
      { where: { otp_id: otpEntry.getDataValue("otp_id") } }
    );

    // ✅ ดึง metadata
    const metadataEntries = await OTPMetadata.findAll({
      where: { email, action },
    });

    const metadata: Record<string, string> = {};
    for (const entry of metadataEntries) {
      metadata[entry.getDataValue("field_key")] =
        entry.getDataValue("field_value");
    }

    // ✅ ลบ metadata หลังใช้งาน
    await OTPMetadata.destroy({ where: { email, action } });

    return metadata;
  }
  
}
