import express from "express";
import {
  getEtudiants,
  getEtudiant,
  createEtudiant,
  deleteEtudiant,
  updateEtudiant,
} from "../controllers/etudiant.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const route = express.Router();
route.get("/", authenticate, getEtudiants);
route.post("/", authenticate, createEtudiant);

route.get("/:id", authenticate, getEtudiant);
route.delete("/:id", deleteEtudiant);
route.put("/:id", updateEtudiant);

export default route;
