import { Request, Response } from "express";
import Guide from "../interface/guideModel";
import { log } from "console";

// Create a new guide
export const createGuide = async (req: Request, res: Response) => {
  const {
    card_ID,
    photo,
    first_name,
    last_name,
    birth_day,
    village_id,
    phone_number,
    email,
    background,
  } = req.body;

  try {
    const newGuide = await Guide.create({
      card_ID,
      photo,
      first_name,
      last_name,
      birth_day,
      village_id,
      phone_number,
      email,
      background,
    });

    res.status(201).json({
      message: "Guide created successfully",
      guide: newGuide,
    });
  } catch (error: any) {
    console.log("Error creating guide:", error);

    res.status(500).json({
      error: "Error creating guide",
      details: error.message,
    });
  }
};

// Get all guides
export const getGuides = async (req: Request, res: Response) => {
  try {
    const guides = await Guide.findAll();
    res.status(200).json(guides);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching guides",
      details: error.message,
    });
  }
};

// Get guide by ID
export const getGuideById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }
    res.status(200).json(guide);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching guide",
      details: error.message,
    });
  }
};

// Update guide
export const updateGuide = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    card_ID,
    photo,
    first_name,
    last_name,
    birth_day,
    village_ids,
    phone_number,
    email,
    background,
  } = req.body;

  try {
    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    await guide.update({
      card_ID,
      photo,
      first_name,
      last_name,
      birth_day,
      village_ids,
      phone_number,
      email,
      background,
    });

    res.status(200).json({ message: "Guide updated successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error updating guide",
      details: error.message,
    });
  }
};

// Delete guide
export const deleteGuide = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    await guide.destroy();
    res.status(200).json({ message: "Guide deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error deleting guide",
      details: error.message,
    });
  }
};
