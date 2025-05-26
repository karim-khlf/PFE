import express from "express";
import {
  createGroupe,
  getAllGroupes,
  updateGroupe,
  getGroupe,
  deleteGroupe,
} from "../controllers/groupe.controller.js";
const route = express.Router();

route.post(
  "/",
  authenticate,
  authorizeRoles("admin", "etudiant"),
  createGroupe
);
route.get(
  "/",
  authenticate,
  authorizeRoles("admin", "etudiant", "enseignant"),
  getAllGroupes
);
route.patch(
  "/:id",
  authenticate,
  authorizeRoles("admin", "etudiant", "enseignant"),
  updateGroupe
);
route.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "etudiant", "enseignant"),
  getGroupe
);
route.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin", "etudiant"),
  deleteGroupe
);

export default route;
