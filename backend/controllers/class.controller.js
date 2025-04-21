import {
  creatClassService,
  deleteClassService,
  updateClassService,
  getClassService,
  getAllClassesService,
} from "../services/class.services.js";
export const createClass = async (req, res) => {
  try {
    const newClass = await creatClassService(req);
    return res.status(200).json(newClass);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deleteClass = async (req, res) => {
  try {
    await deleteClassService(req);
    return res.status(200).json({ message: "the class deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const upadteClass = async (req, res) => {
  try {
    const updatedClass = await updateClassService(req);
    return res.status(200).json(updatedClass);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllClasses = async (req, res) => {
  try {
    const classes = await getAllClassesService(req);
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getClass = async (req, res) => {
  try {
    const requestedClass = await getClassService(req);
    return res.status(200).json(requestedClass);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
