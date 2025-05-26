import express from "express";
const router = express.Router();
import {
  createClass,
  getAllClasses,
  deleteClass,
  updateClass,
  getClass,
} from "../controllers/class.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorizeRoles from "../utils/authorizeRoles.js";

router.post("/", authenticate, authorizeRoles("admin"), createClass);
router.get("/", authenticate, authorizeRoles("admin"), getAllClasses);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteClass);
router.patch("/:id", authenticate, authorizeRoles("admin"), updateClass);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "etudiant", "enseignant"),
  getClass
);

export default router;
