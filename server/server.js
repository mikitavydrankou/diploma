import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import cookieParser from "cookie-parser";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import offerRoutes from "./app/routes/offer.routes.js";
import qrRoutes from "./app/routes/qr.routes.js";

const app = express();
const port = 3000;

const corsOptions = {
    origin: "https://kortowo.ninja",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

authRoutes(app);
userRoutes(app);
offerRoutes(app);
qrRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use(express.static("public"));
