import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Class = sequelize.define(
  "Class",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM("small", "medium", "large"),
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Class;
