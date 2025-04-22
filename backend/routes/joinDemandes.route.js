import express from "express";
import {
  createJoinDemande,
  updateJoinDemande,
  getAllJoinDemandes,
  deleteJoinDemande,
} from "../controllers/joinDemandes.controller.js";
const route = express.Router();

route.post("/", createJoinDemande);
route.get("/", getAllJoinDemandes);
route.patch("/:id", updateJoinDemande);
route.delete("/:id", deleteJoinDemande);

export default route;
