import { sendSMS } from "../services/twilio.sms.service";
import { catchAsync } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "./../config/extended.express";

const sendSingle = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { to, body } = req.body;
		const response = await sendSMS(to, body);

		return res.status(200).json(response);
	}
);

export { sendSingle };
