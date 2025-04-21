import express from "express";
import {
  createGroupe,
  getAllGroupes,
  updateGroupe,
  getGroupe,
  deleteGroupe,
} from "../controllers/groupe.controller.js";
const route = express.Router();

route.post("/", createGroupe);
route.get("/", getAllGroupes);
route.patch("/:id", updateGroupe);
route.get("/:id", getGroupe);
route.delete("/:id", deleteGroupe);

export default route;
