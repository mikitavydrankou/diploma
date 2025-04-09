import authJwt from "../middleware/authJwt.js";
import {
  createOffer,
  getActiveOffers,
  getArchivedOffers,
  deleteOffer,
  fetchOfferById,
} from "../controllers/offer.controller.js";

const routes = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/offer", [authJwt.verifyToken], createOffer);
  app.delete("/api/offer/:id", [authJwt.verifyToken], deleteOffer);
  app.get("/api/offers/active", getActiveOffers);
  app.get("/api/offers/archived", [authJwt.verifyToken], getArchivedOffers);
  app.get("/api/offer/:id", fetchOfferById);
};

export default routes;
