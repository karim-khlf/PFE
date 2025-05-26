import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Specilite = sequelize.define(
  "Specialite",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
export default Specilite;
