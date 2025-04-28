import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.User;
const Role = db.Role;

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
            link: user.link,
            role: decoded.role,
        };

        next();
    });
};

const checkRole = (requiredRole) => {
    const ROLE_HIERARCHY = {
        user: 1,
        moderator: 2,
        admin: 3,
    };

    return (req, res, next) => {
        User.findByPk(req.user.id, {
            include: [{ model: Role, as: "role" }],
        })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: "User not found!" });
                }

                if (!user.role) {
                    return res
                        .status(403)
                        .send({ message: "Role is undefined!" });
                }

                const userRoleLevel = ROLE_HIERARCHY[user.role.name];
                const requiredLevel = ROLE_HIERARCHY[requiredRole];

                if (!requiredLevel) {
                    return res
                        .status(500)
                        .send({ message: "Invalid role check" });
                }

                if (userRoleLevel >= requiredLevel) {
                    next();
                } else {
                    res.status(403).send({
                        message: `Requires ${requiredRole} role or higher!`,
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
    checkRole,
};

export default authJwt;
