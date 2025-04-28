import express from "express";
import upload from "./../utils/multer.js"
import {
    createDocument,
    deleteDocument,
    updateDocument,
    getAllDocument,
    getDocument
} from "../controllers/document.controller.js"

const route = express.Router();
route.post("/", upload.single("file"), createDocument)
route.get("/", getAllDocument)
route.get("/:id",getDocument)
route.delete("/:id",deleteDocument)
route.put("/:id", upload.single("file"), updateDocument)
export default route