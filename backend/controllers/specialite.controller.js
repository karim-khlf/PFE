import {
  createSpecialiteService,
  updateSpecialiteService,
  deleteSpecialiteService,
  getAllSpecialitiesService,
} from "../services/specialite.services.js";

export const createSpecialite = async (req, res) => {
  try {
    const specialite = await createSpecialiteService(req);
    return res.status(200).json(specialite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateSpecialite = async (req, res) => {
  try {
    const specialite = await updateSpecialiteService(req);
    return res.status(200).json(specialite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteSpecialite = async (req, res) => {
  try {
    await deleteSpecialiteService(req);
    return res
      .status(200)
      .json({ message: "specialite has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllSpecialite = async (req, res) => {
  try {
    const specialities = await getAllSpecialitiesService(req);
    return res.status(200).json(specialities);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
