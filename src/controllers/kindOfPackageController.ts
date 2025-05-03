import { Request, Response } from "express";
import KindOfPackage from "../interface/kindOfPackageModel";

// Create a new kind of package
export const createKindOfPackage = async (req: Request, res: Response) => {
  const { name, main_image } = req.body;

  try {
    const newKindOfPackage = await KindOfPackage.create({
      name,
      main_image,
    });

    res.status(201).json({
      message: "Kind of package created successfully",
      kindOfPackage: newKindOfPackage,
    });
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Get all kinds of packages
export const getKindOfPackages = async (req: Request, res: Response) => {
  try {
    const kindsOfPackages = await KindOfPackage.findAll();
    res.status(200).json(kindsOfPackages);
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Get kind of package by ID
export const getKindOfPackageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const kindOfPackage = await KindOfPackage.findByPk(id);
    if (!kindOfPackage) {
      return res.status(404).json({ message: "Kind of package not found" });
    }
    res.status(200).json(kindOfPackage);
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Update kind of package
export const updateKindOfPackage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, main_image } = req.body;

  try {
    const kindOfPackage = await KindOfPackage.findByPk(id);
    if (!kindOfPackage) {
      return res.status(404).json({ message: "Kind of package not found" });
    }

    await kindOfPackage.update({ name, main_image });

    res.status(200).json({ message: "Kind of package updated successfully" });
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};

// Delete kind of package
export const deleteKindOfPackage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const kindOfPackage = await KindOfPackage.findByPk(id);
    if (!kindOfPackage) {
      return res.status(404).json({ message: "Kind of package not found" });
    }

    await kindOfPackage.destroy();
    res.status(200).json({ message: "Kind of package deleted successfully" });
  } catch (error: any) {
    // แก้ไขการระบุประเภทของ error
    res.status(500).json({
      error: "Error creating kind of package",
      details: error.message || "Unknown error", // ตรวจสอบว่า error.message มีอยู่หรือไม่
    });
  }
};
