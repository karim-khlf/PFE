import express from "express";
import User from "../models/user.js";
import Entreprise from "../models/etudiant.js";
import sequelize from "../index.js";
import {
  getAllEntreprises,
  getEntreprise,
  createEntreprise,
  deleteEntreprise,
  updateEntreprise,
} from "../controllers/entreprise.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../utils/authorizeRoles.js";
const route = express.Router();

route.get("/", authenticate, authorizeRoles("admin"), getAllEntreprises);
route.post("/", authenticate, authorizeRoles("admin"), createEntreprise);

route.get("/:id", authenticate, authorizeRoles("admin"), getEntreprise);
route.delete("/:id", authenticate, authorizeRoles("admin"), deleteEntreprise);
route.patch("/:id", authenticate, authorizeRoles("admin"), updateEntreprise);
export default route;
