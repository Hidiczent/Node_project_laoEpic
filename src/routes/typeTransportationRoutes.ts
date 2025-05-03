import { Router } from "express";
import {
  createTypeTransportation,
  getAllTypesTransportation,
  updateTypeTransportation,
  deleteTypeTransportation,
} from "../controllers/typeTransportationController";

const router = Router();

router.post("/create", createTypeTransportation);
router.get("/", getAllTypesTransportation);
router.put("/update/:id", updateTypeTransportation);
router.delete("/delete/:id", deleteTypeTransportation);

export default router;
