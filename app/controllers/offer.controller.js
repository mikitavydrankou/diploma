// createOffer,
// getActiveOffers,
// getArchivedOffers,
// deleteOffer,

import db from "../models/index.js";
const Offer = db.Offer;

export const getActiveOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll({
      where: {
        status: "active",
        expiresAt: { [db.Sequelize.Op.gt]: new Date() },
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "username", "link"],
        },
      ],
    });
    res.status(200).json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while getting active offers" });
  }
};

export const getArchivedOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll({
      where: {
        status: "archived",
      },
    });

    res.status(200).json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while getting archive offers" });
  }
};

export const createOffer = async (req, res) => {
  try {
    const { title, description, ttlHours, place, counter_offer } = req.body;

    if (!title || !description || !ttlHours || !place) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const ttlHoursNumber = Number(ttlHours);
    if (isNaN(ttlHoursNumber) || ttlHoursNumber < 1) {
      return res.status(400).send({ message: "Invalid TTL value" });
    }

    const expiresAt = new Date(Date.now() + ttlHoursNumber * 3600 * 1000);

    console.log("Creating offer");

    const offer = await Offer.create({
      title,
      place,
      counter_offer,
      description,
      ttlHours,
      expiresAt,
      userId: req.userId,
      status: "active",
    });

    res.status(201).json(offer);
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

    if (offer.userId !== req.userId) {
      return res.status(403).json({ message: "Permission denied" });
    }

    await offer.destroy();

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    console.error("Deleting error:", err);
    res.status(500).json({ message: "Failed to delete offer" });
  }
};

export const fetchOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id, {
      include: [
        {
          model: db.User,
          attributes: ["id", "username", "link"],
        },
      ],
    });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json(offer);
  } catch (err) {
    console.error("Deleting error:", err);
    res.status(500).json({ message: "Failed to delete offer" });
  }
};
