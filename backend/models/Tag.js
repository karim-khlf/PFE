const { DataTypes, DATE } = require('sequelize');
const { sequelize } = require('./index');
module.exports = (sequelize,DataTypes)=>{
    const Tag = sequelize.define("Tag",
        {NOM:{type:DataTypes.STRING(20),allowNull:false}},
        {
            tableName:"Tag",
            modelName:"Tag"
        }
    )
    return Tag
}