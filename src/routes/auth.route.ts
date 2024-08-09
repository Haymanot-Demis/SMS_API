import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { authScema } from "../validations/auth.schema";
import { validationSource } from "../config/constants";

const router = Router();
const authController = new AuthController();

router.post("/register", validate(authScema.register), authController.register);
router.post("/login", validate(authScema.login), authController.login);
router.put(
	"/refreshToken",
	validate(authScema.refreshToken),
	authController.refreshToken
);
router.get(
	"/verifyEmailOrPhoneNumber",
	validate(authScema.verifyEmailOrPhoneNumber, validationSource.QUERY),
	authController.verifyEmailOrPhoneNumber
);
router.get(
	"/forgotPassword",
	validate(authScema.forgetPassword, validationSource.QUERY),
	authController.forgotPassword
);
router.put(
	"/changePassword",
	validate(authScema.changePassword),
	authenticate,
	authController.changePassword
);
router.put(
	"/resetPassword",
	validate(authScema.resetPassword),
	authController.resetPassword
);

router.get("/getApiKey", authenticate, authController.getApiKey);

export default router;
