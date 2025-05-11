import db from "../models/index.js";
const Offer = db.Offer;

const USER_INCLUDE_SETTINGS = {
    model: db.User,
    attributes: ["id", "username", "link"],
};

/* 
    - getActiveOffers: Fetches all active offers that have not expired.
    - getArchivedOffers: Fetches all archived offers.

    - createOffer: Creates a new offer with the provided details.
    - deleteOffer: Deletes an offer by its ID.
    - updateOffer: Updates an existing offer by its ID.
    
    - fetchOfferById: Fetches an offer by its ID.
*/

export const getActiveOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll({
            where: {
                status: "active",
                expiresAt: { [db.Sequelize.Op.gt]: new Date() },
            },
            include: [USER_INCLUDE_SETTINGS],
        });
        res.status(200).json(offers);
    } catch (err) {
        console.error("Error in getActiveOffers:", err);
        res.status(500).json({ message: "Failed to fetch active offers" });
    }
};

export const getArchivedOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll({
            where: {
                status: "archived",
            },
            include: [USER_INCLUDE_SETTINGS],
        });

        res.status(200).json(offers);
    } catch (err) {
        console.error("Error in getArchivedOffers:", err);
        res.status(500).json({ message: "Error while getting archive offers" });
    }
};

export const createOffer = async (req, res) => {
    try {
        const { title, description, ttlHours, place, counter_offer } = req.body;

        if (!title || !description || !ttlHours || !place) {
            return res
                .status(400)
                .send({ message: "All fields are required!" });
        }

        const ttlHoursNumber = Number(ttlHours);
        if (isNaN(ttlHoursNumber) || ttlHoursNumber < 1) {
            return res.status(400).send({ message: "Invalid TTL value" });
        }

        const expiresAt = new Date(Date.now() + ttlHoursNumber * 3600 * 1000);

        console.log("Creating offer");

        try {
            const offer = await Offer.create({
                title,
                place,
                counter_offer,
                description,
                ttlHours,
                expiresAt,
                userId: req.user.id,
                status: "active",
            });
            res.status(201).json(offer);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    message: error.errors.map((e) => e.message),
                });
            }
        }
    } catch (err) {
        console.error("Creating error:", err);
        res.status(500).json({ message: "Cant create offer" });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id);

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        if (
            offer.userId !== req.user.id &&
            req.user.role !== "admin" &&
            req.user.role !== "moderator"
        ) {
            return res.status(403).json({ message: "Permission denied" });
        }

        await offer.destroy();

        res.status(200).json({ message: "Offer deleted successfully" });
    } catch (err) {
        console.error("Deleting error:", err);
        res.status(500).json({ message: "Failed to delete offer" });
    }
};

export const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findByPk(id);

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        if (
            offer.userId !== req.user.id &&
            req.user.role !== "admin" &&
            req.user.role !== "moderator"
        ) {
            return res.status(403).json({ message: "Permission denied" });
        }

        const updatedOffer = await offer.update(req.body);
        res.status(200).json(updatedOffer);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Failed to update offer" });
    }
};

export const fetchOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findByPk(id, {
            include: [USER_INCLUDE_SETTINGS],
        });
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json(offer);
    } catch (err) {
        console.error("Fetching error:", err);
        res.status(500).json({ message: "Failed to fetch offer by id" });
    }
};
