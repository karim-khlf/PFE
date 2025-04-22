import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Entreprise = sequelize.define(
  "Entreprise",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    addresse: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
export default Entreprise;
