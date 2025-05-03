import { Request, Response } from 'express';
import Province from '../interface/provinceModel';

// Create a new province
export const createProvince = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const newProvince = await Province.create({ name });
        res.status(201).json({ message: 'Province created successfully', province: newProvince });
    } catch (error) {
        res.status(500).json({ error: 'Error creating province', details: error });
    }
};

// Get all provinces
export const getProvinces = async (req: Request, res: Response) => {
    try {
        const provinces = await Province.findAll();
        res.status(200).json(provinces);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching provinces', details: error });
    }
};

// Get province by ID
export const getProvinceById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const province = await Province.findByPk(id);
        if (!province) {
            return res.status(404).json({ message: 'Province not found' });
        }
        res.status(200).json(province);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching province', details: error });
    }
};

// Update a province
export const updateProvince = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const province = await Province.findByPk(id);
        if (!province) {
            return res.status(404).json({ message: 'Province not found' });
        }
        await province.update({ name });
        res.status(200).json({ message: 'Province updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating province', details: error });
    }
};

// Delete a province
export const deleteProvince = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const province = await Province.findByPk(id);
        if (!province) {
            return res.status(404).json({ message: 'Province not found' });
        }
        await province.destroy();
        res.status(200).json({ message: 'Province deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting province', details: error });
    }
};
