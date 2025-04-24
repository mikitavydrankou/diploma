import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.User;
const Role = db.Role;

// authJwt.js (измененная функция verifyToken)
const verifyToken = (req, res, next) => {
    let token = req.cookies.token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            link: user.link,
            role: user.role,
        };

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
                    return res
                        .status(403)
                        .send({ message: "Role is undefined!" });
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
                    return res
                        .status(403)
                        .send({ message: "Role is undefined!" });
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

const authJwt = {
    verifyToken,
    isAdmin: checkRole("admin"),
    isModerator: checkRole("moderator"),
    isModeratorOrAdmin: checkAnyRole("moderator", "admin"),
};

export default authJwt;
