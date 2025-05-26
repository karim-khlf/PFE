import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const GroupeNeed = sequelize.define(
  "GroupeNeed",
  {
    idGroupe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idNeed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

export default GroupeNeed;
