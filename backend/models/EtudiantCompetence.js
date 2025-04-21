import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const EtudiantCompetence = sequelize.define(
  "EtudiantCompetence",
  {
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["high", "medium", "low"]],
      },
    },
    etudiantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    competenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);
export default EtudiantCompetence;
