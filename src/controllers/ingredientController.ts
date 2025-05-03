// src/controllers/ingredientController.ts

import { Request, Response } from "express";
import Ingredient from "../interface/ingredientModel";

// สร้าง ingredient ใหม่
export const createIngredient = async (req: Request, res: Response) => {
  const { element_of_ingredient } = req.body;

  try {
    const newIngredient = await Ingredient.create({ element_of_ingredient });
    res.status(201).json({
      message: "Ingredient created successfully",
      ingredient: newIngredient,
    });
  } catch (error) {
    console.error("Error creating ingredient:", error);

    if (error instanceof Error) {
      res.status(500).json({
        error: "Error creating ingredient",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error creating ingredient",
        details: "Unknown error occurred",
      });
    }
  }
};

// ดึงข้อมูล ingredients ทั้งหมด
export const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);

    if (error instanceof Error) {
      res.status(500).json({
        error: "Error fetching ingredients",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error fetching ingredients",
        details: "Unknown error occurred",
      });
    }
  }
};

// ดึงข้อมูล ingredient ตาม ID
export const getIngredientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    console.error("Error fetching ingredient by ID:", error);

    if (error instanceof Error) {
      res.status(500).json({
        error: "Error fetching ingredient",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error fetching ingredient",
        details: "Unknown error occurred",
      });
    }
  }
};

// อัปเดต ingredient
export const updateIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { element_of_ingredient } = req.body;

  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    await ingredient.update({ element_of_ingredient });
    res.status(200).json({ message: "Ingredient updated successfully" });
  } catch (error) {
    console.error("Error updating ingredient:", error);

    if (error instanceof Error) {
      res.status(500).json({
        error: "Error updating ingredient",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error updating ingredient",
        details: "Unknown error occurred",
      });
    }
  }
};

// ลบ ingredient
export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    await ingredient.destroy();
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    console.error("Error deleting ingredient:", error);

    if (error instanceof Error) {
      res.status(500).json({
        error: "Error deleting ingredient",
        details: error.message,
      });
    } else {
      res.status(500).json({
        error: "Error deleting ingredient",
        details: "Unknown error occurred",
      });
    }
  }
};
