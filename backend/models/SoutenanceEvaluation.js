import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const SoutenanceEvaluation = sequelize.define(
  "SoutenanceEvaluation",
  {
    note: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: { min: 0, max: 20 },
    },
    remarque: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    idSoutenance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idEtudiant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);
export default SoutenanceEvaluation;
