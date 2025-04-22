import sequelize from "../index.js";
import {
  createGroupeService,
  getAllGroupesService,
  updateGroupeService,
} from "../services/groupe.services.js";

export const createGroupe = async (req, res) => {
  try {
    const t = sequelize.transaction();
    const groupe = await createGroupeService(req, t);
    await t.commit();
    return res.status(201).json(groupe);
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};
export const getAllGroupes = async (req, res) => {
  try {
    const groupes = await getAllGroupesService(req);
    return res.status(200).json(groupes);
  } catch (error) {}
};
export const updateGroupe = async (req, res) => {
  try {
    await updateGroupeService(req);
    return res.status(200).json({ message: "Groupe updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getGroupe = async (req, res) => {};
export const deleteGroupe = async (req, res) => {};
