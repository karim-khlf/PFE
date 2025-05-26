import { themesAffectationService } from "../services/themesAffectationServices.services.js";

export const themesAffectation = async (req, res) => {
  try {
    const themesGroupesInfos = await themesAffectationService(req);
    return res.status(200).json(themesGroupesInfos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
