import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Tag = sequelize.define(
  "Tag",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
export default Tag;
