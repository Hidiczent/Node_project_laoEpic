import { Request, Response } from "express";
import Accommodation from "../interface/accommodationModel";

// สร้างที่พักใหม่
export const createAccommodation = async (req: Request, res: Response) => {
  const {
    name,
    main_image,
    village_id,
    about,
    popular_facilities,
    latitude,
    longitude,
  } = req.body;

  // ตรวจสอบว่าข้อมูลที่จำเป็นถูกส่งมาและถูกต้อง
  if (!name || !village_id || !latitude || !longitude) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newAccommodation = await Accommodation.create({
      name,
      main_image,
      village_id,
      about,
      popular_facilities,
      latitude,
      longitude,
    });
    res.status(201).json({
      message: "Accommodation created successfully",
      accommodation: newAccommodation,
    });
  } catch (error) {
    console.error("Error creating accommodation:", error); // log error ลง console
    res.status(500).json({ error: "Error creating accommodation", details: error });
  }
};

// ดึงข้อมูลที่พักทั้งหมด
export const getAccommodations = async (req: Request, res: Response) => {
  try {
    const accommodations = await Accommodation.findAll();
    if (accommodations.length === 0) {
      return res.status(404).json({ message: "No accommodations found" });
    }
    res.status(200).json(accommodations);
  } catch (error) {
    console.error("Error fetching accommodations:", error); // log error ลง console
    res.status(500).json({ error: "Error fetching accommodations", details: error });
  }
};

// ดึงข้อมูลที่พักตาม ID
export const getAccommodationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const accommodation = await Accommodation.findByPk(id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }
    res.status(200).json(accommodation);
  } catch (error) {
    console.error("Error fetching accommodation:", error); // log error ลง console
    res.status(500).json({ error: "Error fetching accommodation", details: error });
  }
};

// อัปเดตข้อมูลที่พัก
export const updateAccommodation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    main_image,
    village_id,
    about,
    popular_facilities,
    latitude,
    longitude,
  } = req.body;

  try {
    const accommodation = await Accommodation.findByPk(id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    // ตรวจสอบว่าข้อมูลที่จำเป็นถูกส่งมาและถูกต้อง
    if (!name || !village_id || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await accommodation.update({
      name,
      main_image,
      village_id,
      about,
      popular_facilities,
      latitude,
      longitude,
    });

    res.status(200).json({ message: "Accommodation updated successfully" });
  } catch (error) {
    console.error("Error updating accommodation:", error); // log error ลง console
    res.status(500).json({ error: "Error updating accommodation", details: error });
  }
};

// ลบที่พัก
export const deleteAccommodation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const accommodation = await Accommodation.findByPk(id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    await accommodation.destroy();
    res.status(200).json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    console.error("Error deleting accommodation:", error); // log error ลง console
    res.status(500).json({ error: "Error deleting accommodation", details: error });
  }
};
