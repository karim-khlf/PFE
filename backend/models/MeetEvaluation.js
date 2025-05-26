import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const MeetEvaluation = sequelize.define(
  "MeetEvaluation",
  {
    idMeet: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idEtudiant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    present: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    note: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0.0,
      validate: {
        min: 0,
        max: 20,
      },
    },
    remarque: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);
export default MeetEvaluation;
