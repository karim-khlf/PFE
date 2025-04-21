import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Etudiant = sequelize.define(
  "Etudiant",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    numeroEtudiant: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    annee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isIn: [[2, 3, 4, 5]] },
    },
    moyenne: { type: DataTypes.DECIMAL(4, 2), defaultValue: 0.0 },
    points: { type: DataTypes.INTEGER, defaultValue: 0 },
    idGroupe: {
      type: DataTypes.INTEGER,
    },
    idSpecialite: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
);

export default Etudiant;
