import { Request, Response } from "express";
import Notification from "../interface/notificationModel";

// Create a new notification
export const createNotification = async (req: Request, res: Response) => {
  const { status_notification, order_id } = req.body;

  try {
    const newNotification = await Notification.create({ status_notification, order_id });
    res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error creating notification",
      details: error.message,
    });
  }
};

// Get all notifications
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching notifications",
      details: error.message,
    });
  }
};

// Get a notification by ID
export const getNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching notification",
      details: error.message,
    });
  }
};

// Update a notification by ID
export const updateNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status_notification, order_id } = req.body;

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.update({ status_notification, order_id });
    res.status(200).json({ message: "Notification updated successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error updating notification",
      details: error.message,
    });
  }
};

// Delete a notification by ID
export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.destroy();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error deleting notification",
      details: error.message,
    });
  }
};
