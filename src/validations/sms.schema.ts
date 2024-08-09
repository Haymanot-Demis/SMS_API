import * as Joi from "joi";
import { phoneNumberRegEx } from "./common/common.schema";
import { phoneNumberRegExErrorMessage } from "./common/joiErroroMessages";

export const smsSchema = {
	sendSMS: Joi.object({
		apiKey: Joi.object({
			id: Joi.string().required(),
			key: Joi.string().required(),
		}),
		to: Joi.string().required().pattern(phoneNumberRegEx).messages({
			phoneNumberRegExErrorMessage,
		}),
		body: Joi.string().required(),
	}),
};
