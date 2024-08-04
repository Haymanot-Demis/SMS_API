import { Router, Request, Response, NextFunction } from "express";
import * as SMSController from "./../controllers/sms.controller";
import { validateApiKey } from "../middlewares/auth";

const router = Router();

router.route("/sendSMS").post(validateApiKey, SMSController.sendSingle);

export default router;
