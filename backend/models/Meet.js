const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
    const Meet = sequelize.define('Meet', {
        DATE: { type: DataTypes.DATE, allowNull: false },
        RAPPORT: { type: DataTypes.TEXT, allowNull: false },
        ISCANCELED: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
{
    tableName:"Meet",
    modelName:"Meet"
});
    return Meet;
};