const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize,DataTypes)=>{
        const Necessite=sequelize.define('Necessite',{
            Degree:{type:DataTypes.ENUM("Excellent","Very Good", "Good", "Average"),allowNull:false}},
            {
                tableName:"Necessite",
                modelName:"Necessite"
            }
        )
    return Necessite
}