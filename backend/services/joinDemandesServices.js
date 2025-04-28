import { Etudiant, Groupe, JoinDemande } from "../models/index.js";
import {getConfig} from "../utils/getConfig.js";
import SysConfig from "../models/systemConfig.js";

export const createJoinDemandeService = async (req, t) => {
  const config = await SysConfig.findByPk(req.user.annee);
  if (config.period !== "groupeForming") {
    throw new Error("you are not allowed to perform this action");
  }
  const { cible, idGroupe, idEtudiant } = { ...req.body };
  if (!cible || !idGroupe || !idEtudiant) {
    throw new Error(
      "Tous les champs sont obligatoires: idEtudiant, idGroupe, cible"
    );
  }
  // check if the request is possible
  // check if the etudiant is from the same year and didnt have a groupe
  if (cible === "etudiant") {
    const etudiant = await Etudiant.findByPk(idEtudiant, { transaction: t });
    const groupe = await Groupe.findByPk(idGroupe, { transaction: t });
    if (!groupe || groupe.idChef !== req.user.id) {
      throw new Error(
        "le groupe n'existe pas ou tu n'es pas l admin de ce groupe"
      );
    }
    const config = getConfig(req.user.annee);
    if (groupe.nombreEtudiant === config.maxGroupe) {
      throw new Error("Le groupe est plein");
    }
    if (!etudiant || etudiant.annee !== req.user.annee || etudiant.idGroupe) {
      throw new Error(
        "Impossible de joindre un etudiant qui ne fait pas partie de votre annee ou qui a déjà un groupe"
      );
    }
    const newJoinDemande = await JoinDemande.create(
      { ...req.body },
      { transaction: t }
    );
    return newJoinDemande;
  } else if (cible === "groupe") {
    // check if the etudiant already have a groupe or no
    if (idEtudiant !== req.user.id) {
      throw new Error("Impossible de joindre un autre etudiant à un groupe");
    }
    const etudiant = await Etudiant.findByPk(req.user.id, { transaction: t });
    if (etudiant.idGroupe) {
      throw new Error("you already have a groupe, must leave it first");
    }
    const groupe = await Groupe.findByPk(idGroupe, { transaction: t });
    const config = getConfig(req.user.annee);
    if (
      !groupe ||
      groupe.annee !== req.user.annee ||
      groupe.nombreEtudiant === config.maxGroupe
    ) {
      throw new Error("Le groupe n'existe pas dans ton annee ou deja plein");
    }
    const newJoinDemande = await JoinDemande.create(
      { ...req.body },
      { transaction: t }
    );
    return newJoinDemande;
  }
  throw new Error("type de cilbe non valid");
  // mzlk te3 groupe ydir union m3a groupe
};

export const updateJoinDemandeService = async (req, t) => {
  const config = await SysConfig.findByPk(req.user.annee);
  if (config.period !== "groupeForming") {
    throw new Error("you are not allowed to perform this action");
  }
  const joinDemande = await JoinDemande.findByPk(req.params.id);
  if (joinDemande.expired === true) {
    throw new Error("this join demande is expired");
  }
  const etudiant = await Etudiant.findByPk(joinDemande.idEtudiant);
  const groupe = await Etudiant.findByPk(joinDemande.idGroupe);
  if (
    (joinDemande.cible === "groupe" && groupe.idChef !== req.user.id) ||
    (joinDemande.cible === "etudiant" && joinDemande.idEtudiant !== req.user.id)
  ) {
    throw new Error("you are not allowd to do this action");
  }
  if (req.body.status === "refused") {
    joinDemande.status = "refused";
    joinDemande.save();
  } else if (req.body.status === "accepted") {
    if (joinDemande.cible === "groupe") {
      if (groupe.status === "full") {
        throw new Error("you groupe has the max number of memebers!");
      } else {
        await JoinDemande.update({
          expired: true,
          where: {
            cible: "groupe",
            idGroupe: groupe.id,
          },
        });
        joinDemande.status = "accepted";
        await joinDemande.save({ transaction: t });
        groupe.nombreEtudiant++;
        await groupe.save({ transaction: t });
        etudiant.idGroupe = groupe.id;
        await etudiant.save({ transaction: t });
      }
    } else {
      if (etudiant.idGroupe) {
        throw new Error("you already have a groupe!");
      } else {
        await JoinDemande.update({
          expired: true,
          where: {
            cible: "etudiant",
            idEtudiant: etudiant.id,
          },
        });
        joinDemande.status = "accepted";
        await joinDemande.save({ transaction: t });
        groupe.nombreEtudiant++;
        await groupe.save({ transaction: t });
        etudiant.idGroupe = groupe.id;
        await etudiant.save({ transaction: t });
      }
    }
  } else {
    throw new Error("please provide a valide value");
  }
};

export const getAllJoinDemandesService = async (req) => {
  const etudiant = await Etudiant.findByPk(req.user.id, { attributes: id });
  if (!etudiant) {
    throw new Error("access denied");
  }
  if (req.query.cible === "groupe") {
    const joinDemandes = await JoinDemande.findAll({
      where: { cible: "groupe", idGroupe: etudiant.idGroupe },
    });
    return joinDemandes;
  } else if (req.query.cible === "etudiant") {
    const joinDemandes = await JoinDemande.findAll({
      where: { cible: "etudiant", idEtudiant: etudiant.id },
    });
    return joinDemandes;
  }
};

export const deleteJoinDemandeService = async (req, t) => {
  const joinDemande = await JoinDemande.findByPk(req.params.id);
  if (!joinDemande || joinDemande.expired) {
    throw new Error(
      "the join demande that you want to delete does not exist or expired"
    );
  }
  const groupe = await Groupe.findByPk(joinDemande.idGroupe);
  if (
    (joinDemande.cible === "etudiant" && joinDemande.idEtudiant !== user.id) ||
    (joinDemande.cible === "groupe" && groupe.idChef !== user.id)
  ) {
    throw new Error("you are not allowed to do this action!");
  } else {
    await JoinDemande.update({ where: { id: req.params.id }, expired: true });
  }
};
