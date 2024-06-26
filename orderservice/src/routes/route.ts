import { requireAuth } from "@sthubhub-aklamaash/common";
import express from "express";
import { GetAllOrdersByUser } from "../controllers/GetAllOrderByUser";
import { ValidateOrder } from "../middleware/ValidatoreOrder";
import { createAnOrder } from "../controllers/CreateAnOrder";
import { GetDetailsAboutSpecificOrder } from "../controllers/GetDetailsAboutSpecificOrder";
import { DeleteAnOrder } from "../controllers/CancelAnOrder";

export const router = express.Router();

router.get("/", requireAuth, GetAllOrdersByUser);
router.post("/", requireAuth, ValidateOrder, createAnOrder);
router.put("/:id", requireAuth, DeleteAnOrder);
router.get("/:id", requireAuth, GetDetailsAboutSpecificOrder);
