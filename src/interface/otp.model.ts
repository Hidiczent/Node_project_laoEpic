import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class OTP extends Model {
  public otp_id!: number;
  public email!: string;
  public code!: string; // ✅ ใช้ชื่อให้ตรงกับ DB
  public action!: string;
  public expires_at!: Date;
  public verified!: boolean;
  public verified_at?: Date;
}

OTP.init(
  {
    otp_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verified_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "otps",
    timestamps: false,
  }
);

export default OTP;
