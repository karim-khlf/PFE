import express from "express";
import {
  getAllEnseignants,
  getEnseignant,
  createEnseignant,
  deleteEnseignant,
  updateEnseignant,
} from "../controllers/enseignant.controller.js";

const route = express.Router();

route.get("/", getAllEnseignants);
route.post("/", createEnseignant);

route.get("/:id", getEnseignant);
route.delete("/:id", deleteEnseignant);
route.put("/:id", updateEnseignant);

export default route;
