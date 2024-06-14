import express from "express";
import { PaymentsValidator } from "../middlewares/ValidatePayment";
import { ChargeCreated } from "../controllers/ChargeCreated";
import { requireAuth } from "@sthubhub-aklamaash/common";

export const router = express.Router();

router.post("/", requireAuth, PaymentsValidator, ChargeCreated);
