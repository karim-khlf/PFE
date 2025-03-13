const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports= (sequelize,DataTypes)=>{
    const Competence = sequelize.define("Competence",
        {
            NOM:{type:DataTypes.STRING(20),allowNull:false},
            Type:{type:DataTypes.STRING(20),allowNull:false}
            },{
            tableName:"Competence",
            modelName:"Competence"
            }
        )
        return Competence
        }