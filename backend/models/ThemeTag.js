import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const ThemeTag = sequelize.define(
  "ThemeTag",
  {
    id_tag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_Theme: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  { timestamps: false }
);
export default ThemeTag;
