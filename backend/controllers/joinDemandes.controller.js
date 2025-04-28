import sequelize from "../index.js";
import {
  createJoinDemandeService,
  updateJoinDemandeService,
  getAllJoinDemandesService,
  deleteJoinDemandeService,
} from "../services/joinDemandesServices.js";

export const createJoinDemande = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const joinDemande = await createJoinDemandeService(req, t);
    return res.json(joinDemande).status(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateJoinDemande = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const updatedJoinDemande = await updateJoinDemandeService(req, t);
    return res.status(200).json(updatedJoinDemande);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllJoinDemande = async (req, res) => {
  try {
    const joinDemandes = await getAllJoinDemandesService(req);
    return res.status(200).json(joinDemandes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteJoinDemande = async (req, res) => {
  try {
    await deleteJoinDemandeService(req);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
