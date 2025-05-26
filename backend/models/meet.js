import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Meet = sequelize.define(
  "Meet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rapport: {
      type: DataTypes.TEXT,
    },
    idGroupe: {
      type: DataTypes.INTEGER,
    },
    idEnseignant: {
      type: DataTypes.INTEGER,
    },
    idEntreprise: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);
export default Meet;
