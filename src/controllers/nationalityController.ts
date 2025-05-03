// src/controllers/nationalityController.ts
import { Request, Response } from "express";
import Nationality from "../interface/nationalityModel";

// Create a new nationality
export const createNationality = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newNationality = await Nationality.create({ name });
    res.status(201).json({
      message: "Nationality created successfully",
      nationality: newNationality,
    });
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Get all nationalities
export const getNationalities = async (req: Request, res: Response) => {
  try {
    const nationalities = await Nationality.findAll();
    res.status(200).json(nationalities);
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Get nationality by ID
export const getNationalityById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const nationality = await Nationality.findByPk(id);
    if (!nationality) {
      return res.status(404).json({ message: "Nationality not found" });
    }
    res.status(200).json(nationality);
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Update nationality
export const updateNationality = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const nationality = await Nationality.findByPk(id);
    if (!nationality) {
      return res.status(404).json({ message: "Nationality not found" });
    }

    await nationality.update({ name });
    res.status(200).json({ message: "Nationality updated successfully" });
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Delete nationality
export const deleteNationality = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const nationality = await Nationality.findByPk(id);
    if (!nationality) {
      return res.status(404).json({ message: "Nationality not found" });
    }

    await nationality.destroy();
    res.status(200).json({ message: "Nationality deleted successfully" });
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};
