import express from "express";
import { NewTicket } from "../controllers/newticket";
import { requireAuth } from "@sthubhub-aklamaash/common";
import { UpdateTicket } from "../controllers/UpdateTicket";
import { GetAllTickets } from "../controllers/GetAllTickets";
import { DeleteATicket } from "../controllers/DeleteATicket";
import { GetDetailsAboutATicket } from "../controllers/GetDetailsAboutATicket";
import { TicketValidator } from "../middleware/CheckIfValidCreds";

export const router = express.Router();

router.post("/", requireAuth, TicketValidator, NewTicket); // create a new ticket
router.get("/", GetAllTickets); // get all tickets
router.put("/:id", requireAuth, UpdateTicket); //  get details about a specific ticket
router.delete("/:id/deleteticket", requireAuth, DeleteATicket); // delete the specific ticket
router.get("/:id", GetDetailsAboutATicket);
