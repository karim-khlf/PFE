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
export default sequelize;
