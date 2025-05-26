import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const JoinDemande = sequelize.define("JoinDemande", {
  idGroupe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  idEtudiant: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cible: {
    type: DataTypes.ENUM("groupe", "etudiant"),
    allowNull: false,
  },
  state: {
    type: DataTypes.ENUM("pending", "accepted", "refused"),
    allowNull: false,
    defaultValue: "pending",
  },
  expired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
export default JoinDemande;
