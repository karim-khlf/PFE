import { Op } from "sequelize";
import { Etudiant, Groupe, User } from "../models/index.js";
import { getConfig } from "../utils/getConfig.js";
import { createJoinDemandeService } from "./joinDemandesService.js";

export const createGroupeService = async (req, t) => {
  const config = getConfig(req.user.annee);
  const userIdGroupe = await Etudiant.findByPk(req.user.id, {
    attributes: ["idGroupe"],
  });
  if (userIdGroupe) {
    throw new Error("you already in a groupe, can't create another");
  }
  if (!req.body.name) {
    throw new Error("Please provide a name for the groupe");
  }
  // check if the number of etudiants let him create a groupe
  if (req.body.etudiantsIds.length < config.minGroupe - 1) {
    throw new Error(
      `you can't create a groupe with less than ${config.minGroupe} etudiant(s)`
    );
  }
  // check if the etudiants are valid
  const etudiants = await Etudiant.findAll({
    where: {
      id: { [Op.in]: req.body.etudiantsIds },
      idGroupe: null,
      annee: req.user.annee,
    },
  });
  if (etudiants.length < config.minGroupe - 1) {
    throw new Error(
      `Some etudiants Ids are not valid: they do not exist or already have a groupe, please provide valid ids`
    );
  } else {
    // create the groupe
    const groupe = await Groupe.create(
      {
        idChef: req.user.id,
        annee: req.user.annee,
        name: req.body.name,
      },
      { transaction: t }
    );
    if (!groupe) {
      throw new Error("couldn't create the groupe, please try again");
    }
    for (let etudiant of etudiants) {
      let joinDemandReq = { ...req };
      joinDemandReq.body.idEtudiant = etudiant.id;
      joinDemandReq.body.idGroupe = groupe.id;
      joinDemandReq.body.cible = "etudiant";
      await createJoinDemandeService(joinDemandReq, t);
    }
    return groupe;
  }
};

export const getAllGroupesService = async (req) => {
  const groupes = Groupe.findAll({ where: req.query });
  return groupes;
};

export const updateGroupeService = async (req) => {
  const user = req.user;

  if (user.role === "etudiant") {
    const groupe = await Groupe.findByPk(req.params.id);
    if (groupe.idChef !== user.id) {
      throw new Error("only the admin of the groupe could make changes!");
    }
    if (req.body.status && groupe.status === "pending") {
      throw new Error(
        "you have to reach the minimum valide number of members first!"
      );
    }
    if (req.body.status === "pending") {
      throw new Error(
        "you could not change the status of the groupe to pending!"
      );
    }
    const config = await getConfig(groupe.annee);
    if (req.body.status === "valide") {
      if (groupe.nombreEtudiant === config.maxGroupe) {
        throw new Error("The groupe is already full!");
      }
    }
    await groupe.update({ name: req.body.name, status: req.body.status });
  } else if (user.role === "admin") {
  }
};
