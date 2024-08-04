import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth";
import passport from "passport";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/refreshToken", authController.refreshToken);
router.get(
	"/verifyEmailOrPhoneNumber",
	authController.verifyEmailOrPhoneNumber
);
router.get("/forgotPassword", authController.forgotPassword);
router.put("/changePassword", authenticate, authController.changePassword);
router.put("/resetPassword", authController.resetPassword);

router.get("/getApiKey", authenticate, authController.getApiKey);

export default router;
