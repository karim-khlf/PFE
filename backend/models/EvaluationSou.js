const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
    const EvaluationSou = sequelize.define('EvaluationSou', {
        NOTE: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
        REMARQUE: { type: DataTypes.TEXT, allowNull: false },
    },
    {
        tableName:"EvaluationSou",
        modelName:"EvaluationS"
    });
    return EvaluationSou;
};
