import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Enseignant = sequelize.define(
  "Enseignant",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    nss: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    idSpecialite: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);
export default Enseignant;
