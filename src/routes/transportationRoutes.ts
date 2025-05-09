import { Router } from "express";
import {
  createTransportation,
  getAllTransportations,
  updateTransportation,
  deleteTransportation,
} from "../controllers/transportationController";

const router = Router();

router.post("/create", createTransportation);
router.get("/gets", getAllTransportations);
router.put("/update/:id", updateTransportation);
router.delete("/delete/:id", deleteTransportation);

export default router;
