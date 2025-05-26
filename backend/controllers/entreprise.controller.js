import sequelize from "../sequelize.js";
import {
  getAllEntreprisesService,
  createEntrepriseService,
  getEntrepriseService,
  deleteEntrepriseService,
  updateEntrepriseService,
} from "../services/entreprise.services.js";

export const getAllEntreprises = async (req, res) => {
  try {
    const entreprises = await getAllEntreprisesService();
    return res.status(200).json(entreprises);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getEntreprise = async (req, res) => {
  try {
    const entreprise = await getEntrepriseService(req);
    return res.status(200).json(entreprise);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createEntreprise = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const entreprise = await createEntrepriseService(req, t);
    return res.status(200).json(entreprise);
    await t.commit();
  } catch (error) {
    await t.rollback();
    return res.status(400).json({ message: error.message });
  }
};

export const deleteEntreprise = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    await deleteEntrepriseService(req, t);
    await t.commit();
    return res.status(200).json({ message: "Entreprise deleted successfully" });
  } catch (error) {
    await t.rollback();
    return res.status(400).json({ message: error.message });
  }
};

export const updateEntreprise = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const entreprise = await updateEntrepriseService(req, t);
    await t.commit();
    return res.status(200).json(entreprise);
  } catch (error) {
    await t.rollback();
    return res.status(400).json({ message: error.message });
  }
};
