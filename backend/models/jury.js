import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Jury = sequelize.define(
  "Jury",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isIn: [[2, 3, 4, 5]] },
    },
    idSpecialite: { type: DataTypes.INTEGER },
    idChef: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false }
);
export default Jury;
