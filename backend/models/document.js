import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Document = sequelize.define(
  "Document",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: {
      type: DataTypes.ENUM("CONCEPTION", "ARCHITECTURE", "DEPLOIEMENT"),
      allowNull: false,
    },
    date: { type: DataTypes.DATE, allowNull: false },
    lien: { type: DataTypes.STRING, allowNull: false },
    idAuteur: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Document;
