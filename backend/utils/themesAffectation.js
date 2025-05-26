import { Theme } from "../models/theme.js";
import aleatoireMethodeSansChoix from "./aleatoireMethodeSansChoix.js";
import MaxMethode from "./MaxMethode.js";
import MediumMethode from "./MediumMethode.js";
const themesAffectation = async (annee, methode, specialiteId) => {
  let whereThemes;
  let whereGroupes;
  let themesGroupesArray;
  if (specialiteId) {
    whereThemes = { specialiteId, annee, isValid };
    whereGroupes = { specialiteId, annee };
  } else {
    whereThemes = { annee, isValid };
    whereGroupes = { annee };
  }
  const themesIds = await Theme.findAll({
    where: { ...whereThemes },
    attributes: { id },
  });
  const groupesIds = await Groupe.findAll({
    where: { ...whereGroupes },
    attributes: { id },
  });
  switch (methode) {
    case 1:
      themesGroupesArray = aleatoireMethodeSansChoix(themesIds, groupesIds);
      break;
    case 2:
      themesGroupesArray = MaxMethode(themesIds, groupesIds);
      break;
    case 3:
      themesGroupesArray = MediumMethode(themesIds, groupesIds);
      break;
    default:
      throw new Error("please provide a valid methode number");
  }
  return themesGroupesArray;
};

export default themesAffectation;
