// src/controllers/packageController.ts
import { Request, Response } from "express";
import Package from "../interface/packageModel";
import sequelize from "../config/database";

// Create a new package
export const createPackage = async (req: Request, res: Response) => {
  const {
    title,
    main_image_url,
    about,
    price_in_usd,
    tour_info,
    activities,
    added_person_price_in_usd,
    guide_id,
    accommodation_id,
    transportation_id,
    available_type,
    available_date,
    available_day,
    food_id,
    type_package_id,
    village_id,
    people_limit, // Add people_limit
    bring, // Add bring
  } = req.body;

  try {
    const newPackage = await Package.create({
      title,
      main_image_url,
      about,
      price_in_usd,
      tour_info,
      activities,
      added_person_price_in_usd,
      guide_id,
      accommodation_id,
      transportation_id,
      available_type,
      available_date,
      available_day,
      food_id,
      type_package_id,
      village_id,
      people_limit, // Include people_limit
      bring, // Include bring
    });

    res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error creating package",
      details: error.message,
    });
  }
};

// Get all packages
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await Package.findAll();
    res.status(200).json(packages);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching packages",
      details: error.message,
    });
  }
};

// Get a package by package_id
export const getPackageById = async (req: Request, res: Response) => {
  const { package_id } = req.params;

  try {
    const packageData = await Package.findByPk(package_id);

    if (!packageData) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json(packageData);
  } catch (error) {
    console.error("Error fetching package by ID:", error);
    res.status(500).json({ error: "Error fetching package data" });
  }
};

// Update a package by package_id
export const updatePackage = async (req: Request, res: Response) => {
  const { package_id } = req.params;
  const {
    title,
    main_image_url,
    about,
    price_in_usd,
    tour_info,
    activities,
    added_person_price_in_usd,
    guide_id,
    accommodation_id,
    transportation_id,
    available_type,
    available_date,
    available_day,
    food_id,
    type_package_id,
    village_id,
    people_limit, // Add people_limit
    bring, // Add bring
  } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const packageToUpdate = await Package.findByPk(package_id, {
        transaction: t,
      });
      if (!packageToUpdate) {
        return res.status(404).json({ message: "Package not found" });
      }

      await packageToUpdate.update(
        {
          title,
          main_image_url,
          about,
          price_in_usd,
          tour_info,
          activities,
          added_person_price_in_usd,
          guide_id,
          accommodation_id,
          transportation_id,
          available_type,
          available_date,
          available_day,
          food_id,
          type_package_id,
          village_id,
          people_limit, // Include people_limit
          bring, // Include bring
        },
        { transaction: t }
      );

      return packageToUpdate;
    });

    res.status(200).json({ message: "Package updated successfully", result });
  } catch (error: any) {
    res.status(500).json({
      error: "Error updating package",
      details: error.message,
    });
  }
};

// Delete a package by package_id
export const deletePackage = async (req: Request, res: Response) => {
  const { package_id } = req.params;

  try {
    const packageToDelete = await Package.findByPk(package_id);
    if (!packageToDelete) {
      return res.status(404).json({ message: "Package not found" });
    }

    await packageToDelete.destroy();
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error deleting package",
      details: error.message,
    });
  }
};
