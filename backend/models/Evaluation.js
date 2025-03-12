const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
    const Evaluation = sequelize.define('Evaluation', {
        ISPRESENT: { type: DataTypes.JSON },
        NOTE: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
        REMARQUE: { type: DataTypes.TEXT, allowNull: false },
    },
    {
        tableName:"Evaluation",
        modelName:"Evaluation"
    });
    return Evaluation;
};