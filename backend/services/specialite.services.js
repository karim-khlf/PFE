import { Specialite } from "../models/index.js";
export const createSpecialiteService = async (req) => {
  const newSpecialite = await Specialite.create({ ...req.body });
  if (!newSpecialite) {
    throw new Error("la specialite n'etait pas creer!");
  }
  return newSpecialite;
};
export const deleteSpecialiteService = async (req) => {
  const numberOFDeletedSpc = await Specialite.destroy({
    where: { id: req.params.id },
  });
  if (numberOFDeletedSpc === 0) {
    throw new Error("la specilaite n'etait pas supprimee!");
  }
  return true;
};
export const updateSpecialiteService = async (req) => {
  const updatedSpecialite = await Specialite.update(
    { ...req.body },
    { where: { id: req.params.id } }
  );
  if (!updatedSpecialite) {
    throw new Error("la specialite n'etait pas mettre a jour!");
  }
  return updatedSpecialite;
};
export const getAllSpecialitiesService = async (req) => {
  const specialities = await Specialite.findAll();
  return specialities;
};
