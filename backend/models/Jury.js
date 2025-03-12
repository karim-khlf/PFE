const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
    const Jury = sequelize.define('Jurys', {
        ANNE: { type: DataTypes.ENUM('2', '3', '4', '5') },
        SPECIALITE: { type: DataTypes.ENUM('ISI', 'SIW', 'AI') },
    },
{
    tableName:"Jury",
    modelName:"Jury"
}
);

    return Jury;
};