import { Request, Response } from 'express';
import Village from '../interface/villageModel';

// Create a new village
export const createVillage = async (req: Request, res: Response) => {
    const { name, district_id } = req.body;

    try {
        const newVillage = await Village.create({ name, district_id });
        res.status(201).json({ message: 'Village created successfully', village: newVillage });
    } catch (error) {
        res.status(500).json({ error: 'Error creating village', details: error });
    }
};

// Get all villages
export const getVillages = async (req: Request, res: Response) => {
    try {
        const villages = await Village.findAll();
        res.status(200).json(villages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching villages', details: error });
    }
};

// Get village by ID
export const getVillageById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const village = await Village.findByPk(id);
        if (!village) {
            return res.status(404).json({ message: 'Village not found' });
        }
        res.status(200).json(village);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching village', details: error });
    }
};

// Update a village
export const updateVillage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, district_id } = req.body;

    try {
        const village = await Village.findByPk(id);
        if (!village) {
            return res.status(404).json({ message: 'Village not found' });
        }
        await village.update({ name, district_id });
        res.status(200).json({ message: 'Village updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating village', details: error });
    }
};

// Delete a village
export const deleteVillage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const village = await Village.findByPk(id);
        if (!village) {
            return res.status(404).json({ message: 'Village not found' });
        }
        await village.destroy();
        res.status(200).json({ message: 'Village deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting village', details: error });
    }
};
