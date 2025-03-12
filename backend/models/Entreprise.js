const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports=(sequelize,DataTypes)=>{
const Entreprise = sequelize.define('Entreprise', {
    NUMEROSOCIALE: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    
    SPECIALITE: { type: DataTypes.STRING(20), allowNull: false },
},
{
    tableName:"Entreprise",
    modelName:"Entreprise"
})

return Entreprise;
};
