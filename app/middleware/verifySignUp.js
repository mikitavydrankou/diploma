import db from "../models/index.js";

const Role = db.Role;
const User = db.User;

const checkDuplicateUsername = (req, res, next) => {
    Promise.all([User.findOne({ where: { username: req.body.username } })])
        .then(([userByUsername]) => {
            if (userByUsername) {
                return res
                    .status(400)
                    .send({ message: "Ten nickname jest już zajęty!" });
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

const checkDuplicateLink = (req, res, next) => {
    if (!req.body.link) {
        return next();
    }

    User.findOne({ where: { link: req.body.link } })
        .then((userWithLink) => {
            if (userWithLink) {
                return res.status(400).send({
                    message: "Ten link Facebook jest już zajęty!",
                });
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
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
    checkDuplicateUsername: checkDuplicateUsername,
    checkRolesExisted: checkRolesExisted,
    checkDuplicateLink: checkDuplicateLink,
};

export default verifySignUp;
