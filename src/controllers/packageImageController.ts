import { Request, Response } from "express";
import PackageImage from "../interface/packageImageModel";

export const createPackageImages = async (req: Request, res: Response) => {
  const { package_id, image_url } = req.body;

  if (!Array.isArray(image_url)) {
    return res.status(400).json({ error: "image_url should be an array" });
  }

  try {
    const imagePromises = image_url.map((url) => {
      return PackageImage.create({ package_id, image_url: url });
    });

    const createdImages = await Promise.all(imagePromises);

    res.status(201).json({
      message: "Package images created successfully",
      images: createdImages,
    });
    // console.log("PackageImages ", req.body, image_url);
  } catch (error: any) {
    console.error("Error creating package images:", error);
    res.status(500).json({
      error: "Error creating package images",
      details: error.message,
    });
  }
};

export const getPackageImages = async (req: Request, res: Response) => {
  const { package_id } = req.params;

  // console.log("Received package_id:", package_id); // ตรวจสอบค่า package_id

  if (!package_id) {
    return res.status(400).json({ error: "package_id is required" });
  }

  try {
    const images = await PackageImage.findAll({
      where: { package_id: parseInt(package_id, 10) },
      order: [["image_id", "ASC"]],
    });

    // console.log("Fetched images:", images); // ตรวจสอบข้อมูลที่ได้จากฐานข้อมูล

    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching package images:", error);
    res.status(500).json({ error: "Error fetching package images" });
  }
};

export const updatePackageImage = async (req: Request, res: Response) => {
  try {
    const { image_id } = req.params; // ใช้ image_id แทน package_id
    const imageToUpdate = await PackageImage.findByPk(image_id); // ค้นหาโดย image_id
    if (!imageToUpdate)
      return res.status(404).json({ message: "Image not found" });

    await imageToUpdate.update(req.body);
    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating package image", details: error });
  }
};

export const deletePackageImage = async (req: Request, res: Response) => {
  try {
    const { image_id } = req.params;
    const imageToDelete = await PackageImage.findByPk(image_id);
    if (!imageToDelete)
      return res.status(404).json({ message: "Image not found" });

    await imageToDelete.destroy();
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting package image", details: error });
  }
};
