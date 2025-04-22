import sequelize from "../index.js";
import {
  getAllThemesService,
  getThemeService,
  createThemeService,
  deleteThemeService,
  updateThemeService,
} from "../services/theme.services.js";

export const getAllThemes = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const themes = await getAllThemesService(req, t);
    await t.commit();
    return res.status(200).json(themes);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTheme = async (req, res) => {
  try {
    const theme = await getThemeService(req);
    res.status(200).json(theme);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createTheme = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const theme = await createThemeService(req, t);
    await t.commit();
    return res.status(200).json(theme);
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTheme = async (req, res) => {
  try {
    await deleteThemeService(req);
    return res.status(200).json({ message: "Theme deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTheme = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    await updateThemeService(req, t);
    return res.status(200).json({ message: "Theme updated successfully" });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};
