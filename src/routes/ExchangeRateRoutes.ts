import { Router } from "express";
import {
  createExchangeRate,
  getExchangeRates,
  getExchangeRateById,
  updateExchangeRate,
  deleteExchangeRate,
} from "../controllers/exchangeRateController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/exchange-rate", authenticateToken, createExchangeRate); // Route for creating exchange rate
router.get("/exchange-rate", getExchangeRates); // Route for fetching all exchange rates
router.get("/exchange-rate/:id", getExchangeRateById); // Route for fetching exchange rate by ID
router.put("/exchange-rate/:id", authenticateToken, updateExchangeRate); // Route for updating exchange rate
router.delete("/exchange-rate/:id", authenticateToken, deleteExchangeRate); // Route for deleting exchange rate

export default router;
