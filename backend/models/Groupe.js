const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const db = require('./index')
module.exports = (sequelize, DataTypes) => {
    const Groupe = sequelize.define('Group', {
        ANNE: { type: DataTypes.ENUM('2', '3', '4', '5'), allowNull: false },
        NUMERO: { type: DataTypes.INTEGER,  unique: true },
        NEEDS: { type: DataTypes.TEXT },
    },
{
    tableName:"Groupe",
    modelName:"Groupe"
});


    return Groupe;
};