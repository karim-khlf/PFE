import express from "express";
import User from "../models/user.js";
import Entreprise from "../models/etudiant.js";
import sequelize from "../index.js";
import {
  getAllEntreprises,
  getEntreprise,
  createEntreprise,
  deleteEntreprise,
  updateEntreprise,
} from "../controllers/entreprise.controller.js";
const route = express.Router();
// route.post("/", async (req, res) => {
//   const { name, email, address, telephone, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 16);
//   const t = await sequelize.transaction();
//   try {
//     const user = await User.create(
//       { name, email, password: hashedPassword },
//       { transaction: t }
//     );
//     await Entreprise.create(
//       { id: user.id, address, telephone },
//       { transaction: t }
//     );
//     await t.commit();
//     res
//       .status(201)
//       .json({ message: "Étudiant créé avec succès", user: user.id });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la création de l'étudiant", error });
//   }
// });

// route.put("/:id", async (req, res) => {
//   const { name, email, address, telephone } = req.body;
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "Étudiant non trouvé" });
//     }
//     await user.update({ name, email, address, telephone });
//     res.json({ message: "Étudiant mis à jour avec succès", user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la mise à jour de l'étudiant", error });
//   }
// });

route.get("/", getAllEntreprises);
route.post("/", createEntreprise);

route.get("/:id", getEntreprise);
route.delete("/:id", deleteEntreprise);
route.put("/:id", updateEntreprise);
export default route;
