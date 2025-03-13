const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

module.exports = (sequelize,DataTypes)=>{
    const Soutener = sequelize.define("Soutener",
        {
            Date:{type:DataTypes.DATETIME,allowNull:false}

        },
        {
            tableName:"Soutener",
            modelName:"Soutener"
        }
    )
    return Soutener
}