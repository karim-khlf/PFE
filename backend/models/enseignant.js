import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import User from "./user.js";

// const Enseignant = sequelize.define(
//   "Enseignant",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       references: {
//         model: User,
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     nss: { type: DataTypes.BIGINT, allowNull: false, unique: true },
//     idSpecialite: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   { timestamps: false }
// );

const Enseignant = sequelize.define(
  "Enseignant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    nss: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    idSpecialite: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    // Ajoutez ceci pour forcer la création de la FK
    foreignKeys: [
      {
        name: "fk_enseignant_user",
        fields: ["id"],
        references: {
          table: "Users",
          field: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    ],
  }
);
export default Enseignant;
