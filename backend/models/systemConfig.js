import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const SysConfig = sequelize.define(
  "SysConfig",
  {
    annee: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        isIn: [[2, 3, 4, 5]],
      },
    },
    MinGroupe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    MaxGroupe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    launchDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deadLine: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["themesPosing", "groupeForming", "working"]],
      },
    },
  },
  {
    timestamps: false,
    validate: {
      checkDates() {
        if (this.deadLine <= this.launchDate) {
          throw new Error(
            "La date limite (deadLine) doit être après la date de lancement (launchDate)"
          );
        }
      },
    },
  }
);

export default SysConfig;
