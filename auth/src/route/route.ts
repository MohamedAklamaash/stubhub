import express from "express";
import { currentUser } from "../controllers/current-user";
import { signIn } from "../controllers/signin";
import { signUp } from "../controllers/signup";
import { signOut } from "../controllers/signout";
import { userValidation } from "../middleware/user-validation";
import { currentUserMiddleware } from "../middleware/curr-user";

export const router = express.Router();

router.get("/currentuser",currentUserMiddleware, currentUser);
router.post("/signin", userValidation, signIn);
router.post("/signup", userValidation, signUp);
router.post("/signout", signOut);
