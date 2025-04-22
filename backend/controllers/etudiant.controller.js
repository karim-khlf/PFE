import {
  getAllEtudiantsService,
  getEtudiantService,
  createEtudiantService,
  deleteEtudiantService,
  updateEtudiantService,
} from "../services/etudiant.services.js";

export const getEtudiant = async (req, res) => {
  try {
    const etudiant = await getEtudiantService(req);
    return res.status(200).json(etudiant);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// export const getEtudiants = async (req, res) => {
//   try {
//     const user = req.user;
//     const {
//       name,
//       email,
//       ne,
//       annee,
//       moyenne,
//       minMoyenne,
//       maxMoyenne,
//       points,
//       minPoints,
//       maxPoints,
//       groupeName,
//     } = req.query;
//     const specialite = req.query.specialite?.split(",");
//     const competence = req.query.specialite?.split(",");

//     if (!annee) {
//       return res
//         .status(400)
//         .json({ message: "Bad request: Année obligatoire" });
//     }

//     // const allowedFilters = {
//     //   etudiant: [name, email, ne, annee, specialite, competence],
//     //   entreprise: [name, email, ne, annee],
//     // };

//     let whereEtudiant = {};
//     let whereUser = {};
//     let whereSpecialite = {};
//     let whereCompetence = {};
//     let whereEnseignant = {};
//     let whereEntreprise = {};
//     let whereGroupe = {};

//     if (user.role === "etudiant") {
//       if (
//         (user.specialite && specialite.length > 1) ||
//         (user.specialite &&
//           specialite.length === 1 &&
//           specialite[0] !== user.specialite)
//       ) {
//         res.status(400).json({
//           message:
//             "vous pouvez consulter seulement les etudiant de votre specialite",
//         });
//       }
//       if (user.specialite && !specialite) {
//         return res.status(400).json({
//           message: "bad request: le champ de specialite est obligatoire",
//         });
//       }
//       if (user.annee !== annee) {
//         return res.status(400).json({
//           message:
//             "vous ne pouvez consulter seulement les etudiants de votre annee",
//         });
//       }
//       if (groupeName !== user.groupeName) {
//         return res.status(400).json({
//           message:
//             "vous ne pouvez consulter seulement les etudiants de votre groupe",
//         });
//       }
//       if (
//         moyenne ||
//         minMoyenne ||
//         maxMoyenne ||
//         points ||
//         minPoints ||
//         maxPoints
//       ) {
//         return res
//           .status(400)
//           .json({ message: "Bad request: invalid filtering" });
//       }
//     }

//     if (user.role === "entreprise") {
//       let config = await getConfig(annee);
//       if (config.period === "working") {
//         whereEntreprise.id = user.id;
//       } else {
//         return res.status(403).json({ message: "Access denied" });
//       }
//       if (
//         moyenne ||
//         minMoyenne ||
//         maxMoyenne ||
//         points ||
//         minPoints ||
//         maxPoints ||
//         specialite ||
//         competence ||
//         groupeName
//       ) {
//         return res
//           .status(400)
//           .json({ message: "Bad request: invalid filtering" });
//       }
//     }

//     if (user.role === "enseignant") {
//       const config = await getConfig(annee);
//       if (config.period === "working") {
//         whereEnseignant.id = user.id;
//       }
//     }

//     // valide for all types of users
//     if (name) whereUser.name = { [Op.like]: `%${name}%` };
//     if (email) whereUser.email = { [Op.like]: `%${email}%` };
//     if (ne) whereEtudiant.ne = ne;
//     if (annee && !whereEtudiant.annee) whereEtudiant.annee = annee;
//     // not valid for entreprise
//     if (specialite && !whereSpecialite.name)
//       whereSpecialite.name = { [Op.or]: specialite };
//     if (competence) whereCompetence.name = { [Op.or]: competence };
//     // not valid for entreprises and etudiants
//     if (moyenne) whereEtudiant.moyenne = moyenne;
//     if (minMoyenne) whereEtudiant.minMoyenne = { [Op.gte]: minMoyenne };
//     if (maxMoyenne) whereEtudiant.maxMoyenne = { [Op.lte]: maxMoyenne };
//     if (points) whereEtudiant.points = points;
//     if (minPoints) whereEtudiant.minPoints = { [Op.gte]: minPoints };
//     if (maxPoints) whereEtudiant.maxPoints = { [Op.lte]: maxPoints };
//     if (groupeName) whereGroupe.groupeName = groupeName;

//     const etudiants = await Etudiant.findAll({
//       where: whereEtudiant,
//       include: [
//         {
//           model: User,
//           where: whereUser,
//           attributes: { exclude: ["password"] },
//         },
//         {
//           model: Groupe,
//           where: whereGroupe,
//           attributes: [],
//           include: [
//             {
//               model: Theme,
//               where: whereEnseignant,
//               attributes: [],
//               include: [
//                 {
//                   model: Enseignant,
//                   attributes: [],
//                   where: whereEnseignant,
//                 },
//                 {
//                   model: Entreprise,
//                   attributes: [],
//                   where: whereEntreprise,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           model: Specialite,
//           where: whereSpecialite,
//           attributes: [],
//         },
//         {
//           model: Competence,
//           through: { where: whereCompetence, attributes: [] },
//         },
//       ],
//     });
//     if (!etudiants) {
//       return res.status(404).json({ message: "Aucun étudiant trouvé" });
//     }
//     return res.status(200).json(etudiants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }; lversion te3y hdy 9bel mayse7e7ha chatgpt

export const getEtudiants = async (req, res) => {
  try {
    const etudiants = await getAllEtudiantsService(req);
    return res.status(200).json(etudiants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createEtudiant = async (req, res) => {
  try {
    const etudiant = await createEtudiantService(req);
    res.status(200).json(etudiant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'étudiant", error });
  }
};

export const deleteEtudiant = async (req, res) => {
  try {
    await deleteEtudiantService(req);
    res.status(200).json({ message: "Etudiant supprimé avec succès" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

export const updateEtudiant = async (req, res) => {
  try {
    await updateEtudiantService(req);
    res.status(200).json({ message: "etudiant updated successfully!" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Error updating user or etudiant",
      error: error.message,
    });
  }
};
