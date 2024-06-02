import express from "express";
import { NewTicket } from "../controllers/newticket";
import { requireAuth } from "@sthubhub-aklamaash/common";

export const router = express.Router();

router.post("/", requireAuth, NewTicket);
