import { Request, Response } from 'express';
import Payment from '../interface/paymentModel';

// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
  const {
    payment_amount,
    payment_date,
    payment_method,
    payment_status,
    exchange_rate_id
  } = req.body;

  try {
    const newPayment = await Payment.create({
      payment_amount,
      payment_date,
      payment_method,
      payment_status,
      exchange_rate_id
    });

    res.status(201).json({
      message: 'Payment created successfully',
      payment: newPayment,
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error creating payment',
      details: error.message,
    });
  }
};

// Get all payments
export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error: any) {
    res.status(500).json({
      error: 'Error fetching payments',
      details: error.message,
    });
  }
};

// Get payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(500).json({
      error: 'Error fetching payment',
      details: error.message,
    });
  }
};

// Update payment
export const updatePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    payment_amount,
    payment_date,
    payment_method,
    payment_status,
    exchange_rate_id
  } = req.body;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.update({
      payment_amount,
      payment_date,
      payment_method,
      payment_status,
      exchange_rate_id
    });

    res.status(200).json({ message: 'Payment updated successfully' });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error updating payment',
      details: error.message,
    });
  }
};

// Delete payment
export const deletePayment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.destroy();
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error deleting payment',
      details: error.message,
    });
  }
};
