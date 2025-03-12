const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=> {
const Etudiant = sequelize.define('Etudiant', {
   
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