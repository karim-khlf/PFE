import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const ThemePrerequisite = sequelize.define(
  "ThemePrerequisite",
  {
    theme_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    prerequisite_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["high", "medium", "low"]],
      },
    },
  },
  { timestamps: false }
);
export default ThemePrerequisite;
