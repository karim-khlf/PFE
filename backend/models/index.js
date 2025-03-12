const dotenv= require('dotenv')
const {Sequelize, DataTypes} = require('sequelize')


dotenv.config({path:`${__dirname}/../config.env`})
console.log(process.env.DB_NAME)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

sequelize.authenticate().then(()=>{
  console.log("DB connected...")
}).catch(error=>{
  console.log("Error connection to DB")
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Etudiant=require('./Etudiant.js')(sequelize,DataTypes)
db.Enseignant=require('./Enseignant.js')(sequelize,DataTypes)
db.Groupe=require('./Groupe.js')(sequelize,DataTypes)
db.Groupe.hasMany(db.Etudiant,{
  foreignkey: 'etudiantid',
})
db.Etudiant.belongsTo(db.Groupe)

module.exports = db;
