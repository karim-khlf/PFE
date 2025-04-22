import { Tag } from "../models/index.js";

export const createTagService = async (req, res) => {
  const newTag = await Tag.create({ ...req.body });
  if (!newTag) {
    throw new Error("the tag did not created!");
  }
  return newTag;
};
export const updateTagService = async (req, res) => {
  const updatedTag = await Tag.update({ ...req.body });
  if (!updatedTag) {
    throw new Error("the tag did not updated!");
  }
  return updatedTag;
};
export const deleteTagervice = async (req) => {
  await Tag.destroy({ where: { id: req.params.id } });
  return true;
};
export const getAlltagService = async () => {
  const tags = await Tag.findAll();
  return tags;
};
