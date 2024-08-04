import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import expressSession from "express-session";
import cors from "cors";
import * as envVars from "./config/config";

import routes from "./routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	expressSession({
		secret: envVars.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

// decrypt the body data before passing it to the routes

// app.use((req: Request, res: Response, next: NextFunction) => {
// 	if (!req.path?.startsWith("/api/v1/crypto")) {
// 		const { data } = req.body;
// 		req.body = decrypt(data);
// 	}
// 	next();
// });
app.use("/api/v1", routes);
app.use(errorHandler);

export default app;
