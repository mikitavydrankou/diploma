import config from "../config/db.config.js";
import Sequelize from "sequelize";
import userModel from '../models/user.model.js';
import roleModel from '../models/role.model.js';

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
  }
);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};

db.User = userModel(sequelize, Sequelize);
db.Role = roleModel(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Role.belongsToMany(db.User, {
  through: "user_roles"
});
db.User.belongsToMany(db.Role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

export default db;