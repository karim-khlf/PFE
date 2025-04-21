import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Class = sequelize.define(
  "Class",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM("small", "medium", "large"),
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Class;
