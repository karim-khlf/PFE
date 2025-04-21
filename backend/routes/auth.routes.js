import express from "express";
const router = express.Router();
import { login } from "../middlewares/auth.middleware.js";

router.post("/login", login);
export default router;
