import { Request, Response } from "express";
import ExchangeRate from "../interface/exchangeRateModel";

// Create a new exchange rate
export const createExchangeRate = async (req: Request, res: Response) => {
  const { source_currency, dest_currency, amount } = req.body;

  try {
    const newExchangeRate = await ExchangeRate.create({
      source_currency,
      dest_currency,
      amount,
    });

    res.status(201).json({
      message: "Exchange rate created successfully",
      exchange_rate: newExchangeRate,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating exchange rate",
      details: (error as Error).message,
    });
  }
};

// Get all exchange rates
export const getExchangeRates = async (req: Request, res: Response) => {
  try {
    const exchangeRates = await ExchangeRate.findAll();
    res.status(200).json(exchangeRates);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching exchange rates",
      details: (error as Error).message,
    });
  }
};

// Get exchange rate by ID
export const getExchangeRateById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exchangeRate = await ExchangeRate.findByPk(id);
    if (!exchangeRate) {
      return res.status(404).json({ message: "Exchange rate not found" });
    }
    res.status(200).json(exchangeRate);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching exchange rate",
      details: (error as Error).message,
    });
  }
};

// Update exchange rate
export const updateExchangeRate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { source_currency, dest_currency, amount } = req.body;

  try {
    const exchangeRate = await ExchangeRate.findByPk(id);
    if (!exchangeRate) {
      return res.status(404).json({ message: "Exchange rate not found" });
    }

    await exchangeRate.update({ source_currency, dest_currency, amount });
    res.status(200).json({ message: "Exchange rate updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error updating exchange rate",
      details: (error as Error).message,
    });
  }
};

// Delete exchange rate
export const deleteExchangeRate = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exchangeRate = await ExchangeRate.findByPk(id);
    if (!exchangeRate) {
      return res.status(404).json({ message: "Exchange rate not found" });
    }

    await exchangeRate.destroy();
    res.status(200).json({ message: "Exchange rate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting exchange rate",
      details: (error as Error).message,
    });
  }
};
