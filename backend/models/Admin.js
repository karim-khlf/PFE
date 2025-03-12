const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        NOM: { type: DataTypes.STRING, allowNull: false },
        PRENOM: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
    },
{
    tableName:"Admin",
    modelName:"Admin"
});
    return Admin;
};
