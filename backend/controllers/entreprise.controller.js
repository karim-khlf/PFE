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
    return res.status(400).json({ message: "something went wrong" });
  }
};

export const getEntreprise = async (req, res) => {
  try {
    const entreprise = await getEntrepriseService(req);
    return res.status(200).json(entreprise);
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};

export const createEntreprise = async (req, res) => {
  try {
    const entreprise = await createEntrepriseService(req);
    return res.status(200).json(entreprise);
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};

export const deleteEntreprise = async (req, res) => {
  try {
    await deleteEntrepriseService(req);
    return res.status(200).json({ message: "Entreprise deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};

export const updateEntreprise = async (req, res) => {
  try {
    await updateEntrepriseService(req);
    return res.status(200).json({ message: "Entreprise updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
};
