// import all models
import Classe from "./class.js";
import Competence from "./competence.js";
import Document from "./document.js";
import Enseignant from "./enseignant.js";
import EnseignantJury from "./EnseignantJury.js";
import Entreprise from "./entreprise.js";
import Etudiant from "./etudiant.js";
import EtudiantCompetence from "./EtudiantCompetence.js";
import Groupe from "./Groupe.js";
import GroupeNeed from "./GroupeNeed.js";
import JoinDemande from "./joinDemande.js";
import Jury from "./jury.js";
import Meet from "./meet.js";
import MeetEvaluation from "./MeetEvaluation.js";
import Notification from "./notification.js";
import Prerequisite from "./prerequisites.js";
import Soutenance from "./soutenance.js";
import SoutenanceEvaluation from "./SoutenanceEvaluation.js";
import Specialite from "./specialite.js";
import Tag from "./tag.js";
import Theme from "./theme.js";
import ThemePrerequisite from "./ThemePrerequisite.js";
import ThemeTag from "./ThemeTag.js";
import User from "./user.js";
User.hasOne(Enseignant, { foreignKey: 'id' });
User.hasOne(Etudiant, { foreignKey: 'id' });
Enseignant.belongsTo(User, { foreignKey: 'id' });
Etudiant.belongsTo(User, { foreignKey: 'id' });
Specialite.hasMany(Enseignant,{foreignKey:'idSpecialite'});

Enseignant.belongsTo(Specialite, {foreignKey:'idSpecialite'});
Specialite.hasMany(Etudiant, {foreignKey: 'idSpecialite'}); 

Etudiant.belongsTo(Specialite, { foreignKey: 'idSpecialite'});
Groupe.hasMany(Etudiant, {foreignKey:'id'});
Etudiant.belongsTo(Groupe, {foreignKey:'id'});
Theme.hasMany(Groupe, {foreignKey:'id'});
Groupe.belongsTo(Theme, {foreignKey:'id'});
Enseignant.hasMany(Theme, {foreignKey:'id'});
Theme.belongsTo(Enseignant,{foreignKey:'id'})
Entreprise.hasMany(Theme, {foreignKey:'id'});
Theme.belongsTo(Entreprise,{foreignKey:'id'});
Etudiant.belongsToMany(Competence, {
  through: "EtudiantCompetence",
  foreignKey: "etudiantId",
});

Competence.belongsToMany(Etudiant, {
  through: "EtudiantCompetence",
  foreignKey: "competenceId",
});

export {
  Classe,
  Competence,
  Document,
  Enseignant,
  EnseignantJury,
  Entreprise,
  Etudiant,
  EtudiantCompetence,
  Groupe,
  GroupeNeed,
  JoinDemande,
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
};
