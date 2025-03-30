import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.User;
const Role = db.Role;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const checkRole = (roleName) => {
  return (req, res, next) => {
    User.findByPk(req.userId, {
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    })
      .then((user) => {
        console.log(user.roleId);
        if (!user) {
          return res.status(404).send({ message: "User not found!" });
        }

        if (!user.role) {
          return res.status(403).send({ message: "Role is undefined!" });
        }

        if (user.role.name === roleName) {
          next();
        } else {
          res.status(403).send({
            message: `Needs ${roleName} access!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
};

const checkAnyRole = (...roleNames) => {
  return (req, res, next) => {
    User.findByPk(req.userId, {
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found!" });
        }

        if (!user.Role) {
          return res.status(403).send({ message: "Role is undefined!" });
        }

        if (roleNames.includes(user.Role.name)) {
          next();
        } else {
          res.status(403).send({
            message: `You need one of: ${roleNames.join(", ")}!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
};

const isAdmin = checkRole("admin");
const isModerator = checkRole("moderator");
const isModeratorOrAdmin = checkAnyRole("moderator", "admin");

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
export default authJwt;
