const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

module.exports= (sequelize, DataTypes)=>{
const Enseignant = sequelize.define('Enseignant', {
    
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
