import { Request, Response } from "express";
import AccommodationImage from "../interface/accommodationImageModel";

// สร้างภาพที่พักใหม่
export const createAccommodationImage = async (req: Request, res: Response) => {
  const { accommodation_id, image_url, sub_images } = req.body;

  try {
    const newImage = await AccommodationImage.create({
      accommodation_id,
      image_url,
      sub_images,
    });

    res.status(201).json({
      message: "Accommodation image created successfully",
      image: newImage,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating accommodation image", details: error });
  }
};

// ดึงข้อมูลภาพที่พักทั้งหมด
export const getAccommodationImages = async (req: Request, res: Response) => {
  try {
    const images = await AccommodationImage.findAll();
    res.status(200).json(images);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching accommodation images", details: error });
  }
};

// ดึงข้อมูลภาพที่พักตาม ID
export const getAccommodationImageById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const image = await AccommodationImage.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Accommodation image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching accommodation image", details: error });
  }
};

// อัปเดตข้อมูลภาพที่พัก
export const updateAccommodationImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { image_url, sub_images } = req.body;

  try {
    const image = await AccommodationImage.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Accommodation image not found" });
    }

    await image.update({ image_url, sub_images });

    res
      .status(200)
      .json({ message: "Accommodation image updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating accommodation image", details: error });
  }
};

// ลบภาพที่พัก
export const deleteAccommodationImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const image = await AccommodationImage.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Accommodation image not found" });
    }

    await image.destroy();
    res
      .status(200)
      .json({ message: "Accommodation image deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting accommodation image", details: error });
  }
};
