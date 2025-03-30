import db from "../models/index.js";

const ROLES = db.ROLES;
const User = db.User;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }
      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    Role.findOne({
      where: {
        name: req.body.role,
      },
    })
      .then((role) => {
        if (!role) {
          return res.status(400).send({
            message: `Role '${req.body.role}' doesn't exist!`,
          });
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    next();
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

export default verifySignUp;
