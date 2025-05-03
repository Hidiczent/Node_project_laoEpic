import { Request, Response } from "express";
import Transportation from "../interface/transportationModel";

// Create transportation
export const createTransportation = async (req: Request, res: Response) => {
  const { name, main_image, about, type_transportation_ids, description } =
    req.body;
  try {
    const newTransportation = await Transportation.create({
      name,
      main_image,
      about,
      type_transportation_ids,
      description,
    });
    res
      .status(201)
      .json({
        message: "Transportation created successfully",
        data: newTransportation,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating transportation", details: error });
  }
};
// Get all transportations
export const getAllTransportations = async (req: Request, res: Response) => {
  try {
    const transportations = await Transportation.findAll();
    res.status(200).json(transportations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching transportations", details: error });
  }
};

// Update transportation
export const updateTransportation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, main_image, about, type_transportation_ids, description } =
    req.body;

  try {
    const transportation = await Transportation.findByPk(id);
    if (!transportation)
      return res.status(404).json({ message: "Transportation not found" });

    await transportation.update({
      name,
      main_image,
      about,
      type_transportation_ids,
      description,
    });
    res.status(200).json({ message: "Transportation updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating transportation", details: error });
  }
};

// Delete transportation
export const deleteTransportation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transportation = await Transportation.findByPk(id);
    if (!transportation)
      return res.status(404).json({ message: "Transportation not found" });

    await transportation.destroy();
    res.status(200).json({ message: "Transportation deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting transportation", details: error });
  }
};
