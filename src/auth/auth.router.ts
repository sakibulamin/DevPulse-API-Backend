import { Router } from "express";
import { authController, } from "./auth.controller";
import { User_Roles } from "../middleware/types";
import auth from "../middleware/auth";

const router = Router();

router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);

export const authRoutes = router;