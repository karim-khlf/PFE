const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
        TYPE: { type: DataTypes.ENUM('PV', 'cahier de charge') },
        LIEN: { type: DataTypes.TEXT, allowNull: false },
    },
{
    tableName:"Document",
    modelName:"Document"
});

   
    return Document;
};
