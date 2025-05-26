import {
  getAllEtudiantsService,
  getEtudiantService,
  createEtudiantService,
  updateEtudiantService,
} from "../services/etudiant.services.js";
import sequelize from "../index.js";
import { deleteUserByRoleService } from "../services/user.services.js";

export const getEtudiant = async (req, res) => {
  try {
    const etudiant = await getEtudiantService(req);
    return res.status(200).json(etudiant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getEtudiants = async (req, res) => {
  try {
    const etudiants = await getAllEtudiantsService(req);
    return res.status(200).json(etudiants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createEtudiant = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const etudiant = await createEtudiantService(req, t);
    res.status(200).json(etudiant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEtudiant = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const result = await deleteUserByRoleService(req, t, "etudiant");
    res.status(200).json(result);
    await t.commit();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

export const updateEtudiant = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const result = await updateEtudiantService(req, t);
    await t.commit();
    res.status(200).json(result);
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: error.message,
    });
  }
};
