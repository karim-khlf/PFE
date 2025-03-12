const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

module.exports= (sequelize, DataTypes)=>{
const Enseignant = sequelize.define('Enseignant', {
    NOM: { type: DataTypes.STRING(20), allowNull: false },
    PRENOM: { type: DataTypes.STRING(20), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    SPECIALITE: { type: DataTypes.STRING(20), allowNull: false },
}
,
{
    tableName:"Enseignant",
    modelName:"Enseignant"
}
);
return Enseignant
}
