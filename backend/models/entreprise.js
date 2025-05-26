import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Entreprise = sequelize.define(
  "Entreprise",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    addresse: { type: DataTypes.STRING, allowNull: false },
    numeroTel: { type: DataTypes.STRING, allowNull: false },
    numeroSociale: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
export default Entreprise;
