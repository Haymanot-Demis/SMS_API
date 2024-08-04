import { Request, Response, NextFunction } from "./../config/extended.express";
import { verifyJWTToken } from "../utils/auth";
import userRepository from "../repositories/user.repository";
import {
	BadRequest,
	ResourceNotFoundError,
	unauthunticatedError,
} from "../utils/error";
import apiKeyRepository from "../repositories/apiKey.repository";
import { catchAsync } from "../utils/asyncHandler";

const authenticate = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const header = req.header("Authorization");

		if (!header) return res.status(401).send("No auth header");

		const parts = header.split(" ");
		if (parts.length !== 2) return res.status(401).send("No token provided");
		const token = parts[1];

		try {
			const decoded = verifyJWTToken(token);
			const user = await userRepository.findOne({
				where: { id: decoded.id },
			});
			if (!user) throw new ResourceNotFoundError(`User not found`);

			req.user = user;
			next();
		} catch (err) {
			res.status(401).send("Invalid token");
		}
	}
);

const authRole = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role))
			return res.status(403).send("Unauthorized");
		next();
	};
};

const validateApiKey = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const apiKey = req.body.apiKey;

		if (!apiKey) throw new unauthunticatedError("No api key provided");

		const apiKeyExist = await apiKeyRepository.findOne({
			where: { id: apiKey?.id, key: apiKey?.key },
			relations: ["user"],
		});

		if (!apiKeyExist) throw new unauthunticatedError("Invalid api key");

		// check if the api key is expired
		if (apiKeyExist.expiratAt < new Date()) {
			throw new unauthunticatedError("Api key expired");
		}

		next();
	}
);

export { authenticate, authRole, validateApiKey };
