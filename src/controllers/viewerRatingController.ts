import { Request, Response } from "express";
import ViewerRating from "../interface/viewerRatingModel";

// Create a new viewer rating
export const createViewerRating = async (req: Request, res: Response) => {
  const { ID_user, rating, comment, create_at, package_id } = req.body;

  try {
    const newRating = await ViewerRating.create({
      ID_user,
      rating,
      comment,
      create_at,
      package_id,
    });
    res.status(201).json({
      message: "Viewer rating created successfully",
      rating: newRating,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error creating viewer rating",
      details: error.message,
    });
  }
};

// Get all viewer ratings
export const getViewerRatings = async (req: Request, res: Response) => {
  try {
    const ratings = await ViewerRating.findAll();
    res.status(200).json(ratings);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching viewer ratings",
      details: error.message,
    });
  }
};

// Get a viewer rating by ID
export const getViewerRatingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const rating = await ViewerRating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ message: "Viewer rating not found" });
    }
    res.status(200).json(rating);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching viewer rating",
      details: error.message,
    });
  }
};

// Update a viewer rating by ID
export const updateViewerRating = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ID_user, rating, comment, create_at, package_id } = req.body;

  try {
    const ratingToUpdate = await ViewerRating.findByPk(id);
    if (!ratingToUpdate) {
      return res.status(404).json({ message: "Viewer rating not found" });
    }

    await ratingToUpdate.update({
      ID_user,
      rating,
      comment,
      create_at,
      package_id,
    });

    res.status(200).json({ message: "Viewer rating updated successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error updating viewer rating",
      details: error.message,
    });
  }
};

// Delete a viewer rating by ID
export const deleteViewerRating = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ratingToDelete = await ViewerRating.findByPk(id);
    if (!ratingToDelete) {
      return res.status(404).json({ message: "Viewer rating not found" });
    }

    await ratingToDelete.destroy();
    res.status(200).json({ message: "Viewer rating deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error deleting viewer rating",
      details: error.message,
    });
  }
};
