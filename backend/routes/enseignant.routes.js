import express from "express";
import {
  getAllEnseignants,
  getEnseignant,
  createEnseignant,
  deleteEnseignant,
  updateEnseignant,
} from "../controllers/enseignant.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../utils/authorizeRoles.js";
const route = express.Router();

route.get("/", authenticate, authorizeRoles("admin"), getAllEnseignants);
route.post("/", authenticate, authorizeRoles("admin"), createEnseignant);

route.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "enseignant", "etudiant"),
  getEnseignant
);
route.delete("/:id", authenticate, authorizeRoles("admin"), deleteEnseignant);
route.patch("/:id", authenticate, authorizeRoles("admin"), updateEnseignant);

export default route;
