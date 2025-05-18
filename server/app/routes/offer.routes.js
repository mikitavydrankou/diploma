import authJwt from "../middleware/authJwt.js";
import {
    createOffer,
    deleteOffer,
    updateOffer,
    getActiveOffers,
    getArchivedOffers,
    fetchOfferById,
    countAllOffers,
} from "../controllers/offer.controller.js";

const routes = function (app) {
    app.get("/api/offer/active", getActiveOffers);
    app.get("/api/offer/archived", [authJwt.verifyToken], getArchivedOffers);
    app.get("/api/offer/count", countAllOffers);
    app.get("/api/offer/:id", fetchOfferById);

    app.put("/api/offer/:id", [authJwt.verifyToken], updateOffer);
    app.post("/api/offer", [authJwt.verifyToken], createOffer);
    app.delete("/api/offer/:id", [authJwt.verifyToken], deleteOffer);
};

export default routes;
