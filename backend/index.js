import sequelize from "./sequelize.js";
import "./models/associations.js";
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
    await sequelize.sync();
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

// exports
export default sequelize;
export { connect, syncDB };
