import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const Role = db.Role;
db.sequelize.sync({ alter: true });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import offerRoutes from "./app/routes/offer.routes.js";
authRoutes(app);
userRoutes(app);
offerRoutes(app);

app.listen(port, () => {
    console.log(
        `Example app listening on port ${port}, address http://localhost:${port}`
    );
});

const initialRoles = ["user", "admin", "moderator"];
initialRoles.forEach((name) => Role.findOrCreate({ where: { name } }));

app.use(express.static("public"));
