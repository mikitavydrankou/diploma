import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;

// user role = 1
// admin role = 2
// moderator role = 3

const COOKIE_SETTINGS = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 86400 * 1000,
};

export const signup = async (req, res) => {
    try {
        const role = await Role.findOne({ where: { name: "user" } });
        if (!role) {
            return res.status(500).json({ message: "Role 'user' not found" });
        }

        const user = await User.create({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 8),
            roleId: role.id,
            link: req.body.link,
        });

        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: "HS256",
            expiresIn: 86400,
        });

        res.cookie("token", token, COOKIE_SETTINGS);
        res.status(200).json({
            message: "User registered successfully!",
            id: user.id,
            username: user.username,
            role: role.name,
            link: user.link,
        });
    } catch (err) {
        if (
            err instanceof db.Sequelize.ValidationError ||
            err instanceof db.Sequelize.UniqueConstraintError
        ) {
            const errors = err.errors.map((e) => ({
                field: e.path,
                message: e.message,
            }));
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: "Signup failed" });
    }
};
export const signin = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: "Username and password are required",
            });
        }

        const user = await User.findOne({
            where: { username: req.body.username },
            include: Role,
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role.name },
            config.secret,
            {
                algorithm: "HS256",
                expiresIn: 86400,
            }
        );

        res.cookie("token", token, COOKIE_SETTINGS);

        const responseData = {
            id: user.id,
            username: user.username,
            role: user.role?.name,
            link: user.link,
        };

        console.log(`User ${user.username} authenticated successfully`);
        res.status(200).json(responseData);
    } catch (err) {
        if (err instanceof db.Sequelize.ValidationError) {
            const errors = err.errors.map((e) => ({
                field: e.path,
                message: e.message,
            }));
            return res.status(400).json({ errors });
        }
        res.status(500).json({
            message: "Authentication failed",
            error: process.env.NODE_ENV === "development" ? err.message : null,
        });
    }
};
export const signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).send({ message: "Sign out successfully" });
};
