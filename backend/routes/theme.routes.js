import express from "express";
const route = express.Router();
import {
  getAllThemes,
  getTheme,
  createTheme,
  deleteTheme,
  updateTheme,
} from "../controllers/theme.controller.js";

route.get("/", getAllThemes);
route.post("/", createTheme);
route.put("/:id", updateTheme);
route.delete("/:id", deleteTheme);
route.get("/:id", getTheme);
export default route;
