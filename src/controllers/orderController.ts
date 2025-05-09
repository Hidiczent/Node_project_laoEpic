import { Request, Response } from "express";
import Order from "../interface/orderModel";
import { QueryTypes } from "sequelize";
import Notification from "../interface/notificationModel";

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  const {
    ID_Reformbook,
    package_id,
    order_date,
    order_status,
    cancellation_reason,
    cancellation_date,
    id_payment,
  } = req.body;

  try {
    const newOrder = await Order.create({
      ID_Reformbook,
      package_id,
      order_date,
      order_status,
      cancellation_reason,
      cancellation_date,
      id_payment,
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error creating order",
      details: error.message,
    });
  }
};

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching orders",
      details: error.message,
    });
  }
};

// Get order by ID

export const getOrderById = async (req: Request, res: Response) => {
  const { order_id } = req.params;

  try {
    const order = await Order.sequelize?.query(
      `SELECT 
         o.order_id, o.order_status, o.order_date,
         p.title AS package_title,
         r.first_name, r.last_name, r.email, r.Birth, r.Note, r.Number_of_participants,
         r.Number_of_pass_port, r.Date_for_book
       FROM orders o
       JOIN register_form_to_book r ON o.ID_Reformbook = r.ID_Reformbook
       LEFT JOIN packages p ON o.package_id = p.package_id
       WHERE o.order_id = :order_id`,
      {
        replacements: { order_id },
        type: QueryTypes.SELECT,
      }
    );

    if (!order || order.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order[0]);  // Send back the first result if found
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching order",
      details: error.message,
    });
  }
};

// Update order by ID
export const updateOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const {
    ID_Reformbook,
    package_id,
    order_date,
    order_status,
    cancellation_reason,
    id_payment,
  } = req.body;

  try {
    const orderToUpdate = await Order.findByPk(order_id);
    if (!orderToUpdate) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updateData: any = {
      ID_Reformbook,
      package_id,
      order_date,
      order_status,
      id_payment,
    };

    // Check if the order is being cancelled
    if (order_status === "Cancelled") {
      updateData.cancellation_reason =
        cancellation_reason || "No reason provided";
      updateData.cancellation_date = new Date(); // Set current date for cancellation_date
    } else {
      // If not cancelled, ensure cancellation fields are null
      updateData.cancellation_reason = null;
      updateData.cancellation_date = null;
    }

    await orderToUpdate.update(updateData);

    res
      .status(200)
      .json({ message: "Order updated successfully", order: orderToUpdate });
  } catch (error: any) {
    res.status(500).json({
      error: "Error updating order",
      details: error.message,
    });
  }
};

// Get all orders for current logged-in user

export const getOrdersByUser = async (req: Request, res: Response) => {
  const userId = (req as any).user?.user_id;

  try {
    const orders = await Order.sequelize?.query(
      `SELECT 
          o.*, 
          r.first_name, 
          r.package_id,
          p.title AS package_title,
          p.main_image_url,
          p.price_in_usd,
          p.available_date AS location
       FROM orders o
       JOIN register_form_to_book r ON o.ID_Reformbook = r.ID_Reformbook
       JOIN packages p ON r.package_id = p.package_id
       WHERE r.ID_User = ?
       ORDER BY o.order_date DESC`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
        
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching user's orders",
      details: error.message,
    });
  }
};

export const cancelOrderByUser = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const { reason } = req.body;

  try {
    const order = await Order.findByPk(order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.update({
      order_status: "Cancelled",
      cancellation_reason: reason || "Cancelled by user",
      cancellation_date: new Date(),
    });

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to cancel order",
      details: error.message,
    });
  }
};

// Cancel order by admin  

export const cancelOrderByAdmin = async (req: Request, res: Response) => {
  const { order_id } = req.params;

  try {
    const order = await Order.findByPk(order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.order_status?.toLowerCase() === 'cancelled') {
      return res.status(400).json({ error: "Order is already cancelled" });
    }

    // ✅ ยกเลิกคำสั่งซื้อ
    order.order_status = 'cancelled';
    await order.save();

    // ✅ สร้าง Notification หลังยกเลิก
    await Notification.create({
      order_id: order_id,
      status_notification: 'new', // 'new' สำหรับ unread
    });

    res.status(200).json({ message: "Order has been cancelled successfully" });
  } catch (err: any) {
    console.error("❌ Error cancelling order:", err);
    res.status(500).json({ error: "Failed to cancel order", details: err.message });
  }
};



// Cancleorder
export const cancelOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const { reason } = req.body;

  try {
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.update({
      order_status: "Cancelled",
      cancellation_reason: reason || "Cancelled by user",
      cancellation_date: new Date(),
    });

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err: any) {
    res.status(500).json({
      error: "Failed to cancel order",
      details: err.message,
    });
  }
};

// Delete order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;

  try {
    const orderToDelete = await Order.findByPk(order_id);
    if (!orderToDelete) {
      return res.status(404).json({ message: "Order not found" });
    }

    await orderToDelete.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      error: "Error deleting order",
      details: error.message,
    });
  }
};


export const confirmOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;

  try {
    const order = await Order.findByPk(order_id);
    if (!order || order.order_status.toLowerCase() !== 'pending') {
      return res.status(400).json({ error: 'Invalid or already confirmed order' });
    }

    await order.update({ order_status: 'confirmed' });

    await Notification.create({
      order_id: order_id,
      status_notification: 'new', // หรือ 'confirmed' ตามที่ Flutter รองรับ
    });

    res.status(200).json({ message: 'Order confirmed and notification sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to confirm order' });
  }
};


export const getAdminOrdersWithDetails = async (req: Request, res: Response) => {
  try {
    const orders = await Order.sequelize?.query(
      `SELECT 
         o.order_id, o.order_status, o.order_date,

         p.title AS package_title,
         r.first_name, r.last_name, r.email, r.Birth, r.Note, r.Number_of_participants,
         r.Number_of_pass_port, r.Date_for_book
       FROM orders o
       JOIN register_form_to_book r ON o.ID_Reformbook = r.ID_Reformbook
       JOIN packages p ON o.package_id = p.package_id
       ORDER BY o.order_date DESC`,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch admin order details",
      details: error.message,
    });
  }
};
export const getConfirmedOrdersWithDetails = async (req: Request, res: Response) => {
  try {
    const orders = await Order.sequelize?.query(
      `SELECT 
         o.order_id, o.order_status, o.order_date,
         p.title AS package_title,
         r.first_name, r.last_name, r.email, r.Birth, r.Note, r.Number_of_participants,
         r.Number_of_pass_port, r.Date_for_book
       FROM orders o
       JOIN register_form_to_book r ON o.ID_Reformbook = r.ID_Reformbook
       JOIN packages p ON o.package_id = p.package_id
       WHERE o.order_status = 'confirmed'  -- กรองเฉพาะคำสั่งซื้อที่มีสถานะ confirmed
       ORDER BY o.order_date DESC`,
      { type: QueryTypes.SELECT }
    );
   console.log("➡️ Creating order with package_id:", req.body.package_id);

    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch confirmed orders",
      details: error.message,
    });
  }
};
