import config from "../config/db.config.js";
import Sequelize from "sequelize";
import userModel from "../models/user.model.js";
import roleModel from "../models/role.model.js";
import offerModel from "./offer.model.js";
import schedule from "node-schedule";
import QRCounterModel from "./QRCounter.model.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    logging: false,
});

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = userModel(sequelize, Sequelize);
db.Role = roleModel(sequelize, Sequelize);
db.Offer = offerModel(sequelize, Sequelize);
db.QRCounter = QRCounterModel(sequelize, Sequelize);

db.Offer.addHook("beforeFind", (options) => {
    if (!options.where?.status) {
        options.where = {
            ...options.where,
            expiresAt: { [db.Sequelize.Op.gt]: new Date() },
        };
    }
});

db.User.belongsTo(db.Role);
db.Role.hasMany(db.User, { as: "role", foreignKey: "roleId" });

db.Offer.belongsTo(db.User);
db.User.hasMany(db.Offer, { as: "user", foreignKey: "userId" });

db.ROLES = ["user", "admin", "moderator"];

schedule.scheduleJob("* * * * *", async () => {
    await db.Offer.update(
        { status: "archived" },
        {
            where: {
                expiresAt: { [Sequelize.Op.lt]: new Date() },
                status: "active",
            },
        }
    );
});

export default db;
