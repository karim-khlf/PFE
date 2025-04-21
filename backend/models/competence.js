import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Competence = sequelize.define(
  "Competence",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING(255), allowNull: false },
  },
  { timestamps: false }
);
export default Competence;
