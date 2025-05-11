import authJwt from "../middleware/authJwt.js";
import {
    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard,
    users,
    leaderboard,
    getUserActiveOffers,
    getUserArchivedOffers,
    deleteUser,
    getUserById,
    updateUserRole,
    updateUser,
} from "../controllers/user.controller.js";

const routes = function (app) {
    // User routes
    app.put("/api/users/:id/role", [authJwt.verifyToken], updateUserRole);
    app.get("/api/users", [authJwt.verifyToken], users);
    app.get(
        "/api/users/:userId/offers/active",
        [authJwt.verifyToken],
        getUserActiveOffers
    );
    app.get(
        "/api/users/:userId/offers/archived",
        [authJwt.verifyToken],
        getUserArchivedOffers
    );
    app.get("/api/leaderboard", leaderboard);
    app.get("/api/users/:id", [authJwt.verifyToken], getUserById);
    app.delete(
        "/api/users/:id",
        [authJwt.verifyToken, authJwt.checkRole("admin")],
        deleteUser
    );
    app.put("/api/users/:id", [authJwt.verifyToken], updateUser);

    app.get("/api/auth/me", [authJwt.verifyToken], (req, res) => {
        res.json(req.user);
    });
};

export default routes;
