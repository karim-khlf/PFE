import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("info", "warning", "meet"),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cible: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ["groupe", "person"],
      },
    },
    idEtudiant: {
      type: DataTypes.INTEGER,
    },
    idEntreprise: {
      type: DataTypes.INTEGER,
    },
    idEnseignant: {
      type: DataTypes.INTEGER,
    },
    idGroupe: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);
export default Notification;
