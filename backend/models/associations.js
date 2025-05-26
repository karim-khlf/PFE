import {
  Class,
  Competence,
  Document,
  Enseignant,
  EnseignantJury,
  Entreprise,
  Etudiant,
  EtudiantCompetence,
  Groupe,
  GroupeNeed,
  Jury,
  Meet,
  MeetEvaluation,
  Notification,
  Prerequisite,
  Soutenance,
  SoutenanceEvaluation,
  Specialite,
  Tag,
  Theme,
  ThemePrerequisite,
  ThemeTag,
  User,
} from "../models/index.js";

User.hasOne(Etudiant, { foreignKey: "id" });
Etudiant.belongsTo(User, { foreignKey: "id", onDelete: "CASCADE" });

User.hasOne(Enseignant, { foreignKey: "id", onDelete: "CASCADE" });
Enseignant.belongsTo(User, { foreignKey: "id", onDelete: "CASCADE" });

User.hasOne(Entreprise, { foreignKey: "id" });
Entreprise.belongsTo(User, { foreignKey: "id", onDelete: "CASCADE" });

Groupe.hasMany(Etudiant, { foreignKey: "idGroupe" });
Etudiant.belongsTo(Groupe, { foreignKey: "idGroupe" });

Etudiant.hasOne(Groupe, { foreignKey: "idChef" });
Groupe.belongsTo(User, { foreignKey: "idChef", onDelete: "SET NULL" });

Groupe.belongsTo(Theme, { foreignKey: "idTheme", onDelete: "SET NULL" });
Theme.hasMany(Groupe, { foreignKey: "idTheme" });

Etudiant.hasMany(Document, { foreignKey: "idAuteur" });
Document.belongsTo(Etudiant, { foreignKey: "idAuteur", onDelete: "CASCADE" });

Enseignant.belongsToMany(Jury, {
  foreignKey: "idEnseignant",
  onDelete: "CASCADE",
  through: EnseignantJury,
});
Jury.belongsToMany(Enseignant, {
  foreignKey: "idJury",
  onDelete: "CASCADE",
  through: EnseignantJury,
});

Theme.belongsTo(Enseignant, {
  foreignKey: "idEnseignant",
  onDelete: "SET NULL",
});
Enseignant.hasMany(Theme, { foreignKey: "idEnseignant" });

Theme.belongsTo(Entreprise, {
  foreignKey: "idEntreprise",
  onDelete: "SET NULL",
});
Entreprise.hasMany(Theme, { foreignKey: "idEntreprise" });

Theme.belongsTo(Specialite, {
  foreignKey: "idSpecialite",
  onDelete: "SET NULL",
});
Specialite.hasMany(Theme, { foreignKey: "idSpecilite" });

Theme.belongsToMany(Tag, {
  foreignKey: "idTheme",
  onDelete: "CASCADE",
  through: ThemeTag,
});
Tag.belongsToMany(Theme, {
  foreignKey: "idTag",
  onDelete: "CASCADE",
  through: ThemeTag,
});

Etudiant.belongsToMany(Competence, {
  foreignKey: "idEtudiant",
  onDelete: "CASCADE",
  through: EtudiantCompetence,
});

Competence.belongsToMany(Etudiant, {
  foreignKey: "idCompetence",
  onDelete: "CASCADE",
  through: EtudiantCompetence,
});

Groupe.belongsToMany(Competence, {
  foreignKey: "idGroupe",
  onDelete: "CASCADE",
  through: GroupeNeed,
});

Competence.belongsToMany(Groupe, {
  foreignKey: "idNeed",
  onDelete: "CASCADE",
  through: GroupeNeed,
});

Soutenance.belongsTo(Groupe, { foreignKey: "idGroupe", onDelete: "CASCADE" });
Groupe.hasOne(Soutenance, { foreignKey: "idGroupe" });

Soutenance.belongsTo(Class, { foreignKey: "idGroupe", onDelete: "CASCADE" });
Class.hasOne(Soutenance, { foreignKey: "idGroupe" });

Soutenance.belongsTo(Jury, { foreignKey: "idGroupe", onDelete: "CASCADE" });
Jury.hasOne(Soutenance, { foreignKey: "idGroupe" });

Soutenance.belongsToMany(Etudiant, {
  foreignKey: "idSoutenance",
  onDelete: "CASCADE",
  through: SoutenanceEvaluation,
});

Etudiant.belongsToMany(Soutenance, {
  foreignKey: "idEtudiant",
  onDelete: "CASCADE",
  through: SoutenanceEvaluation,
});

Theme.belongsToMany(Prerequisite, {
  foreignKey: "idTheme",
  onDelete: "CASCADE",
  through: ThemePrerequisite,
});
Prerequisite.belongsToMany(Theme, {
  foreignKey: "idPrerequisite",
  onDelete: "CASCADE",
  through: ThemePrerequisite,
});

Meet.belongsTo(Enseignant, {
  foreignKey: "idEnseignant",
  onDelete: "SET NULL",
});

Enseignant.hasMany(Meet, { foreignKey: "idEnseignant" });

Meet.belongsTo(Groupe, {
  foreignKey: "idGroupe",
  onDelete: "SET NULL",
});

Groupe.hasMany(Meet, { foreignKey: "idGroupe" });

Meet.belongsTo(Entreprise, {
  foreignKey: "idEntreprise",
  onDelete: "SET NULL",
});

Entreprise.hasMany(Meet, { foreignKey: "idEntreprise" });

Meet.belongsToMany(Etudiant, {
  foreignKey: "idMeet",
  onDelete: "CASCADE",
  through: MeetEvaluation,
});

Etudiant.belongsToMany(Meet, {
  foreignKey: "idEtudiant",
  onDelete: "SET NULL",
  through: MeetEvaluation,
});

Notification.belongsTo(Enseignant, {
  foreignKey: "idEnseignant",
  onDelete: "Set NULL",
});
Enseignant.hasMany(Notification, { foreignKey: "idEnseignant" });

Notification.belongsTo(Entreprise, {
  foreignKey: "idEntreprise",
  onDelete: "Set NULL",
});
Entreprise.hasMany(Notification, { foreignKey: "idEntreprise" });

Notification.belongsTo(Etudiant, {
  foreignKey: "idEtudiant",
  onDelete: "Set NULL",
});
Etudiant.hasMany(Notification, { foreignKey: "idEtudiant" });

Notification.belongsTo(Groupe, {
  foreignKey: "idGroupe",
  onDelete: "Set NULL",
});
Groupe.hasMany(Notification, { foreignKey: "idGroupe" });

Specialite.hasMany(Etudiant, { foreignKey: "idSpecialite" });
Etudiant.belongsTo(Specialite, { foreignKey: "idSpecialite" });
