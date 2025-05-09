require("dotenv").config();

module.exports = {
    apps: [
        {
            name: "server",
            script: "./server.js",
            watch: true,
            env: {
                JWT_SECRET: process.env.JWT_SECRET,
                DB_HOST: process.env.DB_HOST,
                DB_USER: process.env.DB_USER,
                DB_PASSWORD: process.env.DB_PASSWORD,
                DB_NAME: process.env.DB_NAME,
                DB_DIALECT: process.env.DB_DIALECT,
                NODE_ENV: process.env.NODE_ENV,
            },
        },
    ],
};
