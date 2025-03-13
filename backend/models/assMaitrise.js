const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize,DataTypes)=>{
        const assMaitrise=sequelize.define('assMaitrise',{
            Degree:{type:DataTypes.ENUM("Excellent","Very Good", "Good", "Average"),allowNull:false}},
            {
                tableName:"assMaitrise",
                modelName:"assMaitrise"
            }
        )
    return assMaitrise
}