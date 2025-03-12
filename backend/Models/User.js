const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const db = require(".");

module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        NOM: { type: DataTypes.STRING(40), allowNull: false },
        email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
        password: { type: DataTypes.STRING(255), allowNull: false },
        role: {type:DataTypes.ENUM('Etudiant','Enseignant','Admin','Entreprise'),allowNull: false}

    },
    {
        tableName:"User",
        modelName:"User"
    })
   
    return User
}