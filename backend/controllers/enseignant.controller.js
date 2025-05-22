import {
  createEnseignantService,
  deleteEnseignantService,
  updateEnseignantService,
  getAllEnseignantsService,
  getEnseignantService,
} from "../services/enseignant.services.js";

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
  try {
    const etudiant = await createEnseignantService(req);
    res
      .status(200)
      .json({ etudiant, message: "enseignant created successfully" });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'enseignant", error });
  }
};

export const deleteEnseignant = async (req, res) => {
  try {
    await deleteEnseignantService(req);
    res.status(200).json({ message: "Etudiant supprimé avec succès" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

export const updateEnseignant = async (req, res) => {
  try {
    await updateEnseignantService(req);
    res.status(200).json({ message: "Etudiant mis à jour avec succès" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Error updating user or etudiant",
      error: error.message,
    });
  }
};
