import express from "express";
const router = express.Router();
import {
  createClass,
  getAllclasses,
  deleteClass,
  updateClass,
  getClass,
} from "../controllers/class.controller.js";

router.post("/", createClass);
router.get("/", getAllclasses);
router.delete("/:id", deleteClass);
router.patch("/:id", updateClass);
router.get("/:id", getClass);

export default routers;
