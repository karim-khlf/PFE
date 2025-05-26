import themesAffectation from "../utils/themesAffectation.js";
import { Groupe, Theme } from "../models/index.js";
export const themesAffectationService = async (req) => {
  const { annee, methode, specialiteId } = { ...req.query };
  const themesGroupesArray = await themesAffectation(
    annee,
    methode,
    specialiteId
  );
  if (!annee || !methode || !specialiteId) {
    throw new Error(
      "please provide all the infos: annee, methode, specialiteId"
    );
  }
  const themesGroupesInfos = themesGroupesArray.map(async (item) => {
    const themeInfos = await Theme.findByPk(item.themeId, {
      attributes: { idTheme: id, title },
    });
    const groupeInfos = await Groupe.findByPk(item.groupeId, {
      attributes: { idGroupe: id, nom, numero },
    });
    return { ...themeInfos, ...groupeInfos };
  });
  themesGroupesArray.forEach(async (element) => {
    await Groupe.update(
      { idTheme: element.idTheme },
      { where: { id: element.idGroupe } }
    );
  });
  return themesGroupesInfos;
};
