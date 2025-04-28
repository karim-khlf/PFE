import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
let env = process.env;
const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  freezeTableName: true,
  logging: false, // hdy baah mchi ay query ndirha yesrali logging
});
// foction de connexion
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// foction de synchronization
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // `alter: true` met à jour la structure sans tout supprimer
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

// exports
export default sequelize;
export { connect, syncDB };
