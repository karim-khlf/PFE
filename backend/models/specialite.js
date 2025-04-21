import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Specilite = sequelize.define(
  "Specialite",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
export default Specilite;
