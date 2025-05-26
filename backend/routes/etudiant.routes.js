import express from "express";
import {
  getEtudiants,
  getEtudiant,
  createEtudiant,
  deleteEtudiant,
  updateEtudiant,
} from "../controllers/etudiant.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../utils/authorizeRoles.js";

const route = express.Router();
route.get("/", authenticate, getEtudiants);
route.post("/", authenticate, authorizeRoles("admin"), createEtudiant);

route.get("/:id", authenticate, getEtudiant);
route.delete("/:id", authenticate, deleteEtudiant);
route.patch("/:id", authenticate, updateEtudiant);

export default route;
