import express from "express";
import { connect, syncDB } from "./index.js";
import cookieParser from "cookie-parser";
import upload from './utils/multer.js';
import cloudinary from './utils/cloudinary.js'
import path from 'path'

// routes
import authRoute from "./routes/auth.routes.js";
import etudiantsRoute from "./routes/etudiant.routes.js";
import enseignantsRoute from "./routes/enseignant.routes.js";
import entreprisesRoute from "./routes/entreprise.routes.js";
import themesRoute from "./routes/theme.routes.js";
import joinDemandesRoute from "./routes/joinDemandes.route.js";
import documentRoute from "./routes/document.routes.js"

import dotenv from "dotenv";
import { createDocument } from "./controllers/document.controller.js";
dotenv.config();
let port = process.env.PORT || 3000;
// connect and sync the database
(async () => {
  await connect();
  await syncDB();
  console.log("Database connection established and tables synchronized");
})();

// routes

// running the server
const app = express();
app.use(express.json());

app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/etudiants", etudiantsRoute);
app.use("/enseignants", enseignantsRoute);
app.use("/entreprises", entreprisesRoute);
app.use("/themes", themesRoute);
app.use("/joinDemandes", joinDemandesRoute);
app.use("/document", documentRoute)
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
