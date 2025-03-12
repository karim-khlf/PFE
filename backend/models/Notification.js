const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        TYPE: { type: DataTypes.ENUM('meet', 'soutenance') },
        CONTENUE: { type: DataTypes.TEXT, allowNull: false },
        CIBLE: { type: DataTypes.STRING, allowNull: false },
    },
{
    tableName:"Notification",
    modelName:"Notification"
});
    return Notification;
};