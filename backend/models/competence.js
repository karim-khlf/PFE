import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Competence = sequelize.define(
  "Competence",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
  },
  { timestamps: false }
);
export default Competence;
