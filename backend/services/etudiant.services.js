import {
  User,
  Etudiant,
  Groupe,
  Competence,
  Specialite,
  Theme,
  EtudiantCompetence,
} from "../models/index.js";

import sequelize from "../index.js";
import bcrypt from "bcryptjs";

import { getConfig } from "../utils/getConfig.js";
import { Op } from "sequelize";

export const getAllEtudiantsService = async (req) => {
  const user = req.user;
  const {
    name,
    email,
    ne,
    annee,
    moyenne,
    minMoyenne,
    maxMoyenne,
    points,
    minPoints,
    maxPoints,
    groupeName,
  } = req.query;

  const specialite = req.query.specialite?.split(",");
  const competence = req.query.competence?.split(",");

  if (!annee) {
    throw new Error("Bad request: Année obligatoire");
  }

  // const allowedFilters = {
  //   etudiant: [name, email, ne, annee, specialite, competence],
  //   entreprise: [name, email, ne, annee],
  // };

  let whereEtudiant = {};
  let whereUser = {};
  let whereSpecialite = {};
  let whereCompetence = {};
  let whereEnseignant = {};
  let whereEntreprise = {};
  let whereGroupe = {};

  if (user.role === "etudiant") {
    if (
      user.specialite &&
      (specialite?.length > 1 ||
        (specialite?.length === 1 && specialite[0] !== user.specialite))
    ) {
      throw new Error(
        "Vous pouvez consulter seulement les étudiants de votre spécialité"
      );
    }

    if (user.specialite && !specialite) {
      throw new Error("Bad request: le champ de spécialité est obligatoire");
    }

    if (user.annee !== annee) {
      throw new Error(
        "Vous ne pouvez consulter que les étudiants de votre année"
      );
    }

    if (groupeName !== user.groupeName) {
      throw new Error(
        "Vous ne pouvez consulter que les étudiants de votre groupe"
      );
    }

    if (
      moyenne ||
      minMoyenne ||
      maxMoyenne ||
      points ||
      minPoints ||
      maxPoints
    ) {
      throw new Error("Bad request: Filtrage invalide");
    }
  }

  if (user.role === "entreprise") {
    let config = await getConfig(annee);
    if (config.period === "working") {
      whereEntreprise.id = user.id;
    } else {
      throw new Error("Access denied");
    }

    if (
      moyenne ||
      minMoyenne ||
      maxMoyenne ||
      points ||
      minPoints ||
      maxPoints ||
      specialite ||
      competence ||
      groupeName
    ) {
      throw new Error("Bad request: Filtrage invalide");
    }
  }

  if (user.role === "enseignant") {
    const config = await getConfig(annee);
    if (config.period === "working") {
      whereEnseignant.id = user.id;
    }
  }

  // Filtrage général
  if (name) whereUser.name = { [Op.like]: `%${name}%` };
  if (email) whereUser.email = { [Op.like]: `%${email}%` };
  if (ne) whereEtudiant.ne = ne;
  if (annee) whereEtudiant.annee = annee;
  // not valid for entreprise
  if (specialite?.length) whereSpecialite.name = { [Op.or]: specialite };
  if (competence?.length) whereCompetence.name = { [Op.or]: competence };
  // not valid for entreprises and etudiants
  if (moyenne) whereEtudiant.moyenne = moyenne;
  if (minMoyenne) whereEtudiant.moyenne = { [Op.gte]: minMoyenne };
  if (maxMoyenne) whereEtudiant.moyenne = { [Op.lte]: maxMoyenne };
  if (points) whereEtudiant.points = points;
  if (minPoints) whereEtudiant.points = { [Op.gte]: minPoints };
  if (maxPoints) whereEtudiant.points = { [Op.lte]: maxPoints };
  if (groupeName) whereGroupe.groupeName = groupeName;

  const etudiants = await Etudiant.findAll({
    where: whereEtudiant,
    include: [
      {
        model: User,
        where: whereUser,
        attributes: { exclude: ["password"] },
      },
      {
        model: Groupe,
        where: whereGroupe,
        attributes: [],
        include: [
          {
            model: Theme,
            attributes: [],
            include: [
              { model: Enseignant, attributes: [], where: whereEnseignant },
              { model: Entreprise, attributes: [], where: whereEntreprise },
            ],
          },
        ],
      },
      {
        model: Specialite,
        where: whereSpecialite,
        attributes: [],
      },
      {
        model: Competence,
        through: { where: whereCompetence, attributes: [] },
      },
    ],
  });

  if (!etudiants.length) {
    throw new Error("Aucun étudiant trouvé");
  }

  return etudiants;
};

export const getEtudiantService = async (req) => {
  const { role, id: userId, annee } = req.user;
  const { id } = req.params;

  if (role === "admin") {
    const etudiant = await Etudiant.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Competence,
          through: { attributes: ["degree"] },
          attributes: ["id", "name"],
        },
        {
          model: Groupe,
          attributes: ["id", "numero"],
        },
        {
          model: Specialite,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!etudiant) {
      throw new Error("etudiant not found");
    }
    return etudiant;
  } else if (role === "enseignant") {
    const config = await getConfig();
    let groupe;
    if (config.period === "working" || config.period === "groupeForming") {
      if (config.period === "working") {
        groupe = await Groupe.findOne({
          include: [
            {
              model: Etudiant,
              where: { id },
              attributes: [],
            },
          ],
          attributes: ["id", "idEncadrant"],
        });

        if (!groupe || groupe.idEncadrant !== userId) {
          throw new Error("Access denied");
        }
      }

      const etudiant = await Etudiant.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Competence,
            through: { attributes: ["degree"] },
            attributes: ["id", "name"],
          },
          {
            model: Groupe,
            attributes: ["id", "numero"],
          },
          {
            model: Specialite,
            attributes: ["id", "name"],
          },
        ],
      });

      return etudiant;
    } else {
      throw new Error("access denied");
    }
  } else if (role === "etudiant") {
    const etudiant = await Etudiant.findOne({
      where: { id, annee },
      attributes: { include: [] },
    });
    if (!etudiant) {
      throw new Error(
        "L'étudiant que vous essayez de consulter n'existe pas ou n'appartient pas à votre année."
      );
    }
    return etudiant;
  } else {
    throw new Error("access denied");
  }
};

export const createEtudiantService = async (req) => {
  const {
    name,
    email,
    numeroEtudiant,
    annee,
    moyenne,
    password,
    specialiteName,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 16);
  const t = await sequelize.transaction();
  let specialite;
  if (specialiteName) {
    specialite = await Specialite.findOne({
      where: { name: specialite },
    });
    if (!specialite) {
      throw new Error("No specialite found");
    }
  }
  const user = await User.create(
    { name, email, password: hashedPassword },
    { transaction: t }
  );
  const etudiant = await Etudiant.create(
    {
      id: user.id,
      numeroEtudiant,
      annee,
      moyenne,
      idSpecialite: specialite.id || null,
    },
    { transaction: t }
  );
  await t.commit();
  return etudiant;
};

export const deleteEtudiantService = async (req) => {
  const { id } = req.params;
  const t = await sequelize.transaction();
  const user = await User.findByPk(id, { transaction: t });

  if (!user) {
    await t.rollback();
    throw new Error("User not found");
  }

  if (user.role === "admin") {
    await t.rollback();
    throw new Error("can't delete the admin");
  }

  await User.destroy({ where: { id }, transaction: t });

  await t.commit();
  return true;
};

export const updateEtudiantService = async (req) => {
  const {
    name,
    email,
    numeroEtudiant,
    annee,
    moyenne,
    password,
    competences,
    specialiteName,
  } = req.body;
  const { id } = req.params;
  const user = req.user;
  const t = await sequelize.transaction();
  let specialite;

  const competencesList = Object.keys(competences);
  if (user.role === "admin") {
    let user = await User.findByPk(id, { transaction: t });
    if (!user) {
      await t.rollback();
      throw new Error("Etudiant not found");
    }
    if (specialiteName) {
      specialite = await Specialite.findOne({
        where: { name: specialite },
      });
      if (!specialite) {
        throw new Error("No specialite found ");
      }
    }
    let updatedUser = false;
    if (name || email || password) {
      const userUpdates = {
        name: name || user.name,
        email: email || user.email,
        password: password ? await bcrypt.hash(password, 16) : user.password,
      };
      const [updated] = await User.update(
        { ...userUpdates },
        { where: { id }, transaction: t }
      );
      updatedUser = updated > 0;
    }
    let etudiant = await Etudiant.findByPk(user.id);
    if (!etudiant) {
      await t.rollback();
      throw new Error("Etudiant not found");
    }
    let updatedEtudiant = false;
    if (numeroEtudiant || annee || moyenne) {
      const etudiantUpdates = {
        numeroEtudiant: numeroEtudiant || etudiant.numeroEtudiant,
        annee: annee || etudiant.annee,
        moyenne: moyenne || etudiant.moyenne,
      };
      const [updated] = await Etudiant.update(
        { ...etudiantUpdates },
        { where: { userId: id }, returning: true, transaction: t }
      );
      updatedEtudiant = updated > 0;
    }

    if (!updatedUser && !updatedEtudiant) {
      await t.rollback();
      throw new Error("No changes made");
    }

    await t.commit();
    return true;
  }
  if (user.id === id) {
    // the etudiant want to update his profile
    if (name || email || numeroEtudiant || annee || moyenne || password) {
      res.status(403).json({ message: "you can update just competences" });
    }
    const comptencesIds = await Competence.findAll({
      where: { name: { [Op.in]: competencesList } },
      transaction: t,
    });
    await EtudiantCompetence.destroy({
      where: {
        idEtudiant: user.id,
        idCompetence: { [Op.not]: comptencesIds },
      },
      transaction: t,
    });
    await EtudiantCompetence.create();
    return true;
  }
};
