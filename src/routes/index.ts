import { Router } from "express";
import authRouter from "./auth.route";
import SMSRouter from "./sms.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/sms", SMSRouter);

export default router;
