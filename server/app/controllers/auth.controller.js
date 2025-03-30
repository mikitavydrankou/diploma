import db from "../models/index.js";
import config from "../config/auth.config.js";
const User = db.User;
const Role = db.Role;

const Op = db.Sequelize.Op;

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = (req, res) => {
  // user role = 1
  // admin role = 2
  // moderator role = 3

  const roleName = req.body.role || "user";

  Role.findOne({
    where: {
      name: roleName,
    },
  })
    .then((role) => {
      if (!role) {
        return Role.findOne({ where: { name: "user" } });
      }
      return role;
    })
    .then((role) => {
      return User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: role.id,
      });
    })
    .then(() => {
      res.send({ message: "User registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
    include: Role,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 h
      });

      const roleName = user.Role ? user.Role.name : "user";
      const authorities = ["ROLE_" + roleName.toUpperCase()];

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
