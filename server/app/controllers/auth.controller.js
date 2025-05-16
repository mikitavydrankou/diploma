import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import logger from "../config/logger.js";

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

const validatePasswordStrength = (password) => {
    if (!password) {
        return "Hasło nie może być puste";
    }

    if (password.length < 8) {
        return "Hasło musi mieć co najmniej 8 znaków";
    }

    const strongPasswordPattern = /^(?=.*[a-z])(?=.*\d).+$/;

    if (!strongPasswordPattern.test(password)) {
        return "Hasło musi zawierać co najmniej jedną cyfrę i jedną małą literę";
    }

    return null;
};

export const signup = async (req, res) => {
    try {
        const passwordError = validatePasswordStrength(req.body.password);
        if (passwordError) {
            return res.status(400).json({
                message: passwordError,
            });
        }

        const role = await Role.findOne({ where: { name: "user" } });
        if (!role) {
            return res
                .status(500)
                .json({ message: "Nie znaleziono roli 'user'" });
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
            message: "Użytkownik zarejestrował się pomyślnie!",
            id: user.id,
            username: user.username,
            role: role.name,
            link: user.link,
        });
        logger.info(`User ${user.username} signup successfully`);
    } catch (err) {
        if (
            err instanceof db.Sequelize.ValidationError ||
            err instanceof db.Sequelize.UniqueConstraintError
        ) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({
            message:
                "Rejestracja nie powiodła się z powodu wewnętrznego błędu serwera",
        });
        logger.error(`Signup error: ${err.stack}`);
    }
};

export const signin = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: "Wymagana jest nazwa użytkownika i hasło",
            });
        }

        const user = await User.findOne({
            where: { username: req.body.username },
            include: Role,
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: "Użytkownik nie został znaleziony" });
        }

        const passwordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordValid) {
            return res.status(401).json({
                message: "Nieprawidłowe dane",
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

        logger.info(`User ${user.username} signin successfully`);
        res.status(200).json(responseData);
    } catch (err) {
        if (
            err instanceof db.Sequelize.ValidationError ||
            err instanceof db.Sequelize.UniqueConstraintError
        ) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({
            message:
                "Rejestracja nie powiodła się z powodu wewnętrznego błędu serwera",
        });
        logger.error(`Signin error: ${err.stack}`);
    }
};
export const signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).send({ message: "Wyloguj się pomyślnie" });
};
