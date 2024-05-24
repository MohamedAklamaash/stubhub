import express from "express";
import { currentUser } from "../controllers/current-user";
import { signIn } from "../controllers/signin";
import { signUp } from "../controllers/signup";
import { signOut } from "../controllers/signout";
import { userValidation } from "../middleware/user-validation";

export const router = express.Router();

router.get("/currentuser", currentUser);
router.post("/signin", userValidation, signIn);
router.post("/signup", userValidation, signUp);
router.post("/signout", signOut);
