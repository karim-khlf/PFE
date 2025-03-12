const { DataTypes, TableHints } = require('sequelize');
const { sequelize } = require('./index');
module.exports= (sequelize,DataTypes)=>{
const Theme = sequelize.define('Theme', {
    TITLE: { type: DataTypes.STRING(100), allowNull: false },
    DESCRIPTION: { type: DataTypes.TEXT, allowNull: false },
    TAGS: { type: DataTypes.TEXT, allowNull: false },
    PREALABLE: { type: DataTypes.BOOLEAN, defaultValue: false },
    SPECIALITE: { type: DataTypes.ENUM('ISI', 'SIW', 'AI') },
    ANNE: { type: DataTypes.ENUM('2', '3', '4', '5') },
    isValid: { type: DataTypes.BOOLEAN, defaultValue: false },
},
{
    tableName:"Theme",
    modelName:"Theme"
}
)
return Theme
};
