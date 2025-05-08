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
    //tests
    // app.get("/api/test/all", allAccess);
    // app.get("/api/test/user", [authJwt.verifyToken], userBoard);
    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.checkRole("moderator")],
    //     moderatorBoard
    // );
    // app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.checkRole("admin")],
    //     adminBoard
    // );

    /*
    Routes:
    - /api/users: 
        Get all users 
    - /api/users/:userId/offers: 
        Get all offers for a user 
    - /api/leaderboard: 
        Get top 3 users with most offers in the last 20 days
    - /api/users/:id: 
        Get user by id 
    - /api/users/:id/role: 
        Update user role 
    - /api/users/:id: 
        Delete user (requires admin role)
    - /api/users/:id: 
        Update user 
    - /api/auth/me: 
        Get current user 

*/

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
