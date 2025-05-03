import { Request, Response } from 'express';
import District from '../interface/districtModel';

// Create a new district
export const createDistrict = async (req: Request, res: Response) => {
    const { name, province_id } = req.body;

    try {
        const newDistrict = await District.create({ name, province_id });
        res.status(201).json({ message: 'District created successfully', district: newDistrict });
    } catch (error) {
        res.status(500).json({ error: 'Error creating district', details: error });
    }
};

// Get all districts
export const getDistricts = async (req: Request, res: Response) => {
    try {
        const districts = await District.findAll();
        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching districts', details: error });
    }
};

// Get district by ID
export const getDistrictById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const district = await District.findByPk(id);
        if (!district) {
            return res.status(404).json({ message: 'District not found' });
        }
        res.status(200).json(district);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching district', details: error });
    }
};

// Update a district
export const updateDistrict = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, province_id } = req.body;

    try {
        const district = await District.findByPk(id);
        if (!district) {
            return res.status(404).json({ message: 'District not found' });
        }
        await district.update({ name, province_id });
        res.status(200).json({ message: 'District updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating district', details: error });
    }
};

// Delete a district
export const deleteDistrict = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const district = await District.findByPk(id);
        if (!district) {
            return res.status(404).json({ message: 'District not found' });
        }
        await district.destroy();
        res.status(200).json({ message: 'District deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting district', details: error });
    }
};
