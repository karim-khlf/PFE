import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Soutenance = sequelize.define(
  "SoutContainer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: { type: DataTypes.DATE },
    idGroupe: { type: DataTypes.INTEGER, allowNull: false },
    idJury: { type: DataTypes.INTEGER, allowNull: false },
    idClasse: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);
export default Soutenance;
