const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=> {
const Etudiant = sequelize.define('Etudiant', {
    NOM: { type: DataTypes.STRING(20), allowNull: false },
    PRENOM: { type: DataTypes.STRING(20), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    ANNE: { type: DataTypes.ENUM('2', '3', '4', '5') },
    SPECIALITE: { type: DataTypes.ENUM('ISI', 'SIW', 'AI') },
    MOYENNE: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false },
    
},
{
    tableName:"Etudiant",
    modelName: "Etudiant"
}

);
return Etudiant
}