const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
       
    },
{
    tableName:"Admin",
    modelName:"Admin"
});
    return Admin;
};
