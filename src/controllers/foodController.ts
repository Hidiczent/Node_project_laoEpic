import { Request, Response } from 'express';
import Food from '../interface/foodModel';

// Create a new food
export const createFood = async (req: Request, res: Response) => {
  const { name_food, main_image, ingredient_ids, description } = req.body;

  try {
    const newFood = await Food.create({
      name_food,
      main_image,
      ingredient_ids,
      description,
    });
    res.status(201).json({ message: 'Food created successfully', food: newFood });
  } catch (error) {
    res.status(500).json({ error: 'Error creating food', details: error });
  }
};

// Get all foods
export const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await Food.findAll();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching foods', details: error });
  }
};

// Get food by ID
export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching food', details: error });
  }
};

// Update food
export const updateFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name_food, main_image, ingredient_ids, description } = req.body;

  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    await food.update({
      name_food,
      main_image,
      ingredient_ids,
      description,
    });
    res.status(200).json({ message: 'Food updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating food', details: error });
  }
};

// Delete food
export const deleteFood = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    await food.destroy();
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting food', details: error });
  }
};
