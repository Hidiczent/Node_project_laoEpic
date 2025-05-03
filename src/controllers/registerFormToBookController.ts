import { Request, Response } from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import RegisterFormBook from "../interface/registerFormToBookModel"; // Import model
import Nationality from "../interface/nationalityModel";
import Package from "../interface/packageModel";
// ฟังก์ชันสำหรับบันทึกข้อมูลและส่งอีเมล
export const sendRegisterFormEmail = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    email,
    birth,
    nationality_id,
    date_for_booking,
    number_of_participants = 1,
    passport_number = "",
    note = "",
    package_id,
  } = req.body;

  // console.log("Received data:", req.body);

  const id_user = (req as any).user ? (req as any).user.ID_User : null;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !birth ||
    !nationality_id ||
    !date_for_booking ||
    !package_id
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // ดึงข้อมูลแพ็กเกจ
    const packageData = await Package.findByPk(package_id);
    if (!packageData) {
      return res.status(404).json({ error: "Package not found" });
    }
    const title = packageData.getDataValue("title");

    // ดึงข้อมูลสัญชาติ
    const nationality = await Nationality.findByPk(nationality_id);
    const nationalityName = nationality ? nationality.name : "Unknown";

    // บันทึกข้อมูลการจอง
    const newBooking = await RegisterFormBook.create({
      first_name,
      last_name,
      Email: email,
      Birth: birth,
      ID_Nationality: nationality_id,
      Date_for_book: date_for_booking,
      Number_of_participants: number_of_participants,
      Number_of_pass_port: passport_number,
      Note: note,
      ID_User: id_user,
      package_id,
    });

    // เตรียมอีเมลสำหรับแอดมิน
    const adminTemplatePath = path.join(
      __dirname,
      "../views/adminEmailTemplate.html"
    );
    let adminEmailTemplate = fs.readFileSync(adminTemplatePath, "utf-8");

    adminEmailTemplate = adminEmailTemplate
      .replace("{{package_name}}", title)
      .replace("{{first_name}}", first_name)
      .replace("{{last_name}}", last_name)
      .replace("{{email}}", email)
      .replace("{{birth}}", birth || "")
      .replace("{{nationality}}", nationalityName)
      .replace("{{date_for_booking}}", date_for_booking.toString())
      .replace("{{number_of_participants}}", number_of_participants.toString())
      .replace("{{passport_number}}", passport_number || "")
      .replace("{{note}}", note);

    // เตรียมอีเมลสำหรับผู้จอง
    const userTemplatePath = path.join(
      __dirname,
      "../views/userEmailTemplate.html"
    );
    let userEmailTemplate = fs.readFileSync(userTemplatePath, "utf-8");

    userEmailTemplate = userEmailTemplate
      .replace("{{package_name}}", title)
      .replace("{{first_name}}", first_name)
      .replace("{{last_name}}", last_name)
      .replace("{{date_for_booking}}", date_for_booking.toString())
      .replace("{{number_of_participants}}", number_of_participants.toString())
      .replace("{{note}}", note);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ส่งอีเมลถึงแอดมิน
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New booking form submission",
      html: adminEmailTemplate,
    };

    await transporter.sendMail(adminMailOptions);

    // ส่งอีเมลถึงผู้จอง
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // อีเมลของผู้จอง
      subject: "Booking Confirmation - LaoEpic",
      html: userEmailTemplate,
    };

    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      message: "Booking saved and emails sent successfully",
      booking: newBooking,
    });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Error saving booking or sending emails",
      details: error.message || "Unknown error",
    });
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลการจองทั้งหมด
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await RegisterFormBook.findAll();
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching bookings",
      details: error.message || "Unknown error",
    });
  }
};

// ฟังก์ชันสำหรับอัปเดตข้อมูลการจอง
export const updateBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    birth,
    nationality_id,
    date_for_booking,
    number_of_participants,
    passport_number,
    note,
    package_id,
  } = req.body;

  try {
    const booking = await RegisterFormBook.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.update({
      first_name,
      last_name,
      Email: email, // ใช้ชื่อ Email ให้ตรงกับฐานข้อมูล
      Birth: birth, // ใช้ชื่อ Birth ให้ตรงกับฐานข้อมูล
      ID_Nationality: nationality_id,
      Date_for_book: date_for_booking,
      Number_of_participants: number_of_participants,
      Number_of_pass_port: passport_number,
      Note: note,
      package_id,
    });

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error: any) {
    res.status(500).json({
      error: "Error updating booking",
      details: error.message || "Unknown error",
    });
  }
};

// ฟังก์ชันสำหรับลบข้อมูลการจอง
export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const booking = await RegisterFormBook.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.destroy();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error deleting booking",
      details: error.message || "Unknown error",
    });
  }
};
