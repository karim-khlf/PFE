import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Theme = sequelize.define(
  "Theme",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isIn: [[2, 3, 4, 5]] },
    },
    academicYear: {
      type: DataTypes.INTEGER,
    },
    isValide: { type: DataTypes.BOOLEAN, defaultValue: false },
    idEnseignant: { type: DataTypes.INTEGER },
    idEntreprise: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
);

export default Theme;
