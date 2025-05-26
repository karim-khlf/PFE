import express from "express";
const router = express.Router();

router.post("/", createSpecialite);
router.get("/", getAllSpecialities);
router.patch("/:id", updateSpecialite);
router.delete("/:id", createSpecialite);
export default router;
