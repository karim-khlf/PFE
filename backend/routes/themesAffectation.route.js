import express from "express";
import { themesAffectation } from "../controllers/themesAffectation.controller.js";

const router = express.Router();

router.post("/", themesAffectation);

export default router;
