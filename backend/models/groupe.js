import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Groupe = sequelize.define(
  "Groupe",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    numero: { type: DataTypes.INTEGER },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isIn: [[2, 3, 4, 5]] },
    },
    idChef: { type: DataTypes.INTEGER, unique: true },
    idTheme: {
      type: DataTypes.INTEGER,
    },
    nombreEtudiant: { type: DataTypes.INTEGER, defaultValue: 1 },
    status: {
      type: DataTypes.ENUM("pending", "valide", "full"),
      defaultValue: "pending",
    },
  },
  { timestamps: false }
);
export default Groupe;
