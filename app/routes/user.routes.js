import authJwt from "../middleware/authJwt.js";
import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  createOffer,
  getActiveOffers,
  getArchivedOffers,
  users,
  deleteOffer,
  leaderboard,
} from "../controllers/user.controller.js";

const routes = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
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

  app.post("/api/offer", [authJwt.verifyToken], createOffer);
  app.delete("/api/offer/:id", [authJwt.verifyToken], deleteOffer);
  app.get("/api/offers/active", getActiveOffers);
  app.get("/api/offers/archived", [authJwt.verifyToken], getArchivedOffers);
  app.get("/api/users", users);
  app.get("/api/leaderboard", leaderboard);
};

export default routes;
