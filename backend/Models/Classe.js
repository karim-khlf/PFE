const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
module.exports=(sequelize,DataTypes)=>{
    const Classe = sequelize.define("Classe",{
    NOM :{type:DataTypes.VARCHAR(20),allowNull:false},
    Type: {type: DataTypes.VARCHAR(20),allowNull:false}

},
{
    tableName:"Classe",
    modelName:"Classe"
}
)
}