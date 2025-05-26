import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const EnseignantJury = sequelize.define(
  "EnseignantJury",
  {
    idEnseignant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idJury: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  { timestamps: false }
);
export default EnseignantJury;
