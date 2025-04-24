import authJwt from "../middleware/authJwt.js";
import {
    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard,
    users,
    leaderboard,
} from "../controllers/user.controller.js";

const routes = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", allAccess);
    app.get("/api/test/user", [authJwt.verifyToken], userBoard);
    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        moderatorBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        adminBoard
    );

    app.get("/api/users", users);

    app.get("/api/leaderboard", leaderboard);

    app.get("/api/auth/me", [authJwt.verifyToken], (req, res) => {
        res.json(req.user);
    });
};

export default routes;
