import {
  createEnseignantService,
  deleteEnseignantService,
  updateEnseignantService,
  getAllEnseignantsService,
  getEnseignantService,
} from "../services/enseignant.services.js";

import sequelize from "../sequelize.js";

export const getAllEnseignants = async (req, res) => {
  try {
    const enseignants = await getAllEnseignantsService(req);
    res.status(200).json(enseignants);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
};

export const getEnseignant = async (req, res) => {
  try {
    const enseignant = await getEnseignantService(req);
    res.status(200).json(enseignant);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
};

export const createEnseignant = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const enseignant = await createEnseignantService(req);
    res
      .status(200)
      .json({ enseignant, message: "enseignant created successfully" });
    await t.commit();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

export const deleteEnseignant = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    await deleteEnseignantService(req, t);
    res.status(200).json({ message: "enseignant supprimé avec succès" });
    await t.commit();
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

export const updateEnseignant = async (req, res) => {
  try {
    await updateEnseignantService(req);
    res.status(200).json({ message: "Eenseignant mis à jour avec succès" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Error updating user or etudiant",
      error: error.message,
    });
  }
};
