import express from "express";
const router = express.Router();

import {
  createTag,
  deleteTag,
  updateTag,
  getAllTags,
} from "../controllers/tag.controller.js";

router.post("/", createTag);
router.delete("/:id", deleteTag);
router.patch("/:id", updateTag);
router.get("/", getAllTags);

export default router;
