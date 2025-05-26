import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Prerequisites = sequelize.define(
  "Prerequisites",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: {
      type: DataTypes.ENUM("projet", "stage", "autre"),
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Prerequisites;
