import { Request, Response } from "express";
import TypeTransportation from "../interface/typeTransportationModel";

// Create type of transportation
export const createTypeTransportation = async (req: Request, res: Response) => {
  const { name, main_image } = req.body;

  try {
    const newTypeTransportation = await TypeTransportation.create({ name, main_image });
    res.status(201).json({ message: "Type of transportation created successfully", data: newTypeTransportation });
  } catch (error) {
    res.status(500).json({ error: "Error creating type of transportation", details: error });
  }
};

// Get all types of transportation
export const getAllTypesTransportation = async (req: Request, res: Response) => {
  try {
    const types = await TypeTransportation.findAll();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: "Error fetching types of transportation", details: error });
  }
};

// Update type of transportation
export const updateTypeTransportation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, main_image } = req.body;

  try {
    const typeTransportation = await TypeTransportation.findByPk(id);
    if (!typeTransportation) return res.status(404).json({ message: "Type of transportation not found" });

    await typeTransportation.update({ name, main_image });
    res.status(200).json({ message: "Type of transportation updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating type of transportation", details: error });
  }
};

// Delete type of transportation
export const deleteTypeTransportation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const typeTransportation = await TypeTransportation.findByPk(id);
    if (!typeTransportation) return res.status(404).json({ message: "Type of transportation not found" });

    await typeTransportation.destroy();
    res.status(200).json({ message: "Type of transportation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting type of transportation", details: error });
  }
};
