import {
  createTagService,
  deleteTagervice,
  updateTagService,
  getAlltagService,
} from "../services/tag.services";

export const createTag = async (req, res) => {
  try {
    const tag = await createTagService(req);
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
export const updateTag = async (req, res) => {
  try {
    const updatedTag = await updateTagService(req);
    return res.status(200).json(updatedTag);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteTag = async (req, res) => {
  try {
    await deleteTagervice(req);
    return res.status(200).json({ message: "tag delted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllTag = async (req, res) => {
  try {
    const tags = await getAlltagService(req);
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
