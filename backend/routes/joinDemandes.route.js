import express from "express";
import {
  createJoinDemande,
  updateJoinDemande,
  getAllJoinDemande,
  deleteJoinDemande,
} from "../controllers/joinDemandes.controller.js";
const route = express.Router();

route.post("/", createJoinDemande);
route.get("/", getAllJoinDemande);
route.patch("/:id", updateJoinDemande);
route.delete("/:id", deleteJoinDemande);

export default route;
