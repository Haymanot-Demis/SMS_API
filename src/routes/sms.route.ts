import { Router, Request, Response, NextFunction } from "express";
import * as SMSController from "./../controllers/sms.controller";
import { validateApiKey } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { authScema } from "../validations/auth.schema";
import { smsSchema } from "../validations/sms.schema";

const router = Router();

router
	.route("/sendSMS")
	.post(validate(smsSchema.sendSMS), validateApiKey, SMSController.sendSingle);

export default router;
