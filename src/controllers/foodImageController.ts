// src/controllers/foodImageController.ts

import { Request, Response } from 'express';
import FoodImage from '../interface/foodImageModel';

// Create a new food image
export const createFoodImage = async (req: Request, res: Response) => {
  const { food_id, sub_images } = req.body;

  try {
    const newFoodImage = await FoodImage.create({
      food_id,
      sub_images,
    });

    res.status(201).json({
      message: 'Food image created successfully',
      food_image: newFoodImage,
    });
  } catch (error) {
    const err = error as Error; // Cast error to Error
    res.status(500).json({
      error: 'Error creating food image',
      details: err.message, // Now you can safely access err.message
    });
  }
};

// Get all food images
export const getFoodImages = async (req: Request, res: Response) => {
  try {
    const foodImages = await FoodImage.findAll();
    res.status(200).json(foodImages);
  } catch (error) {
    const err = error as Error; // Cast error to Error
    res.status(500).json({
      error: 'Error fetching food images',
      details: err.message,
    });
  }
};

// Get food image by ID
export const getFoodImageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foodImage = await FoodImage.findByPk(id);
    if (!foodImage) {
      return res.status(404).json({ message: 'Food image not found' });
    }
    res.status(200).json(foodImage);
  } catch (error) {
    const err = error as Error; // Cast error to Error
    res.status(500).json({ error: 'Error fetching food image', details: err.message });
  }
};

// Update food image
export const updateFoodImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { food_id, sub_images } = req.body;

  try {
    const foodImage = await FoodImage.findByPk(id);
    if (!foodImage) {
      return res.status(404).json({ message: 'Food image not found' });
    }

    await foodImage.update({ food_id, sub_images });
    res.status(200).json({ message: 'Food image updated successfully' });
  } catch (error) {
    const err = error as Error; // Cast error to Error
    res.status(500).json({ error: 'Error updating food image', details: err.message });
  }
};

// Delete food image
export const deleteFoodImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foodImage = await FoodImage.findByPk(id);
    if (!foodImage) {
      return res.status(404).json({ message: 'Food image not found' });
    }

    await foodImage.destroy();
    res.status(200).json({ message: 'Food image deleted successfully' });
  } catch (error) {
    const err = error as Error; // Cast error to Error
    res.status(500).json({ error: 'Error deleting food image', details: err.message });
  }
};
