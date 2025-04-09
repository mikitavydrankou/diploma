import express from "express";
import cors from "cors";
import db from "./app/models/index.js";

const app = express();
const port = 3000;

var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

app.use(express.json());

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

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

app.use(express.static("public"));
