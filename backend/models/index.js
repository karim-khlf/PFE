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

db.User = require('./User.js')(sequelize,DataTypes)
db.Etudiant = require('./Etudiant.js')(sequelize,DataTypes)
db.Enseignant = require('./Enseignant.js')(sequelize,DataTypes)
db.Groupe = require('./Groupe.js')(sequelize,DataTypes)
db.Admin = require('./Admin.js')(sequelize,DataTypes)
db.Entreprise = require('./Entreprise.js')(sequelize,DataTypes)
db.Document= require('./Document.js')(sequelize,DataTypes)
db.Theme = require('./Theme.js')(sequelize,DataTypes)
db.Jury = require('./Jury.js')(sequelize,DataTypes)
db.Meet = require('./Meet.js')(sequelize,DataTypes)
db.Evaluation = require('./Evaluation')(sequelize,DataTypes)
db.EvaluationSou = require('./EvaluationSou')(sequelize,DataTypes)
db.Classe = require('./Classe.js')(sequelize,DataTypes)




// Foreign keys


db.Groupe.hasMany(db.Etudiant,{
  foreignKey: 'etudiantid',
})
db.Etudiant.belongsTo(db.Groupe)


db.User.hasOne(db.Etudiant, { foreignKey: 'id' });
db.User.hasOne(db.Enseignant, { foreignKey: 'id' });
db.User.hasOne(db.Admin, { foreignKey: 'id' });
db.User.hasOne(db.Entreprise, { foreignKey: 'id' });
db.Etudiant.belongsTo(db.User,{foreignKey:"id"});
db.Enseignant.belongsTo(db.User,{foreignKey:"id"});
db.Admin.belongsTo(db.User,{foreignKey:"id"});
db.Entreprise.belongsTo(db.User,{foreignKey:"id"})

db.User.hasMany(db.Document,{foreignKey:"UserId"})
db.Document.belongsTo(db.User)

db.Jury.belongsToMany(db.Enseignant,{through:"Jury_Enseignant"})
db.Enseignant.belongsToMany(db.Jury,{through:"Jury_Enseignant"})


//
module.exports = db;
