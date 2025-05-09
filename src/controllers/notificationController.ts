import { Request, Response } from "express";
import Notification from "../interface/notificationModel";
import { QueryTypes } from "sequelize";

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
  const { status_notification } = req.body; // รับค่าจาก body สำหรับสถานะของ notification

  // กำหนดค่าที่อนุญาตสำหรับ status_notification
  const validStatuses = ['new', 'read', 'seen'];

  // ตรวจสอบว่า status_notification ที่ส่งมามีค่าเป็นหนึ่งใน validStatuses หรือไม่
  if (!validStatuses.includes(status_notification)) {
    return res.status(400).json({ message: 'Invalid status notification value' });
  }

  try {
    // ค้นหาการแจ้งเตือนตาม ID
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // อัปเดตสถานะของการแจ้งเตือน
    await notification.update({ status_notification });
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



export const getUserNotifications = async (req: Request, res: Response) => {
  const userId = (req as any).user?.user_id;

  try {
    const notifications = await Notification.sequelize?.query(
      `SELECT n.*, o.order_id, o.package_id, o.order_status, p.title AS package_title, p.main_image_url
       FROM notification n
       JOIN orders o ON o.order_id = n.order_id
       JOIN register_form_to_book r ON r.ID_Reformbook = o.ID_Reformbook
       JOIN packages p ON o.package_id = p.package_id
       WHERE r.ID_User = ?
       ORDER BY n.notification_id DESC`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json(notifications);
  } catch (err: any) {
    console.error("❌ Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications", details: err.message });
  }
};
