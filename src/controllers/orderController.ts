import { Request, Response } from "express";
import Order from "../interface/orderModel";

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
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
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
