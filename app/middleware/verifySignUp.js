import db from "../models/index.js";

const Role = db.Role;
const User = db.User;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    Promise.all([
        User.findOne({ where: { username: req.body.username } }),
        User.findOne({ where: { email: req.body.email } }),
    ])
        .then(([userByUsername, userByEmail]) => {
            if (userByUsername) {
                return res
                    .status(400)
                    .send({ message: "Failed! Username is already in use!" });
            }
            if (userByEmail) {
                return res
                    .status(400)
                    .send({ message: "Failed! Email is already in use!" });
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
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
};

export default verifySignUp;
