const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports= (sequelize,DataTypes)=>{
    const besion = sequelize.define("besion",
        {
            NOM:{type:DataTypes.STRING(20),allowNull:false},
            Type:{type:DataTypes.STRING(20),allowNull:false}
            },{
            tableName:"besion",
            modelName:"besion"
            }
        )
        return besion
        }