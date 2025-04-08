import db from "../models/index.js";
const Offer = db.Offer;

export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

export const userBoard = (req, res) => {
  res.status(200).send("User content.");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Admin content.");
};

export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator content.");
};

export const leaderboard = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 20);

    const topUsers = await db.Offer.findAll({
      attributes: [
        "userId",
        [db.sequelize.fn("COUNT", db.sequelize.col("offers.id")), "offerCount"],
      ],

      where: {
        status: ["active", "archived"],
        createdAt: {
          [db.Sequelize.Op.gte]: oneWeekAgo,
        },
      },
      group: ["userId"],
      order: [[db.sequelize.literal("offerCount"), "DESC"]],
      limit: 3,
      include: [
        {
          model: db.User,
          attributes: ["id", "username"],
        },
      ],
    });

    res.status(200).json({ success: true, data: topUsers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching top users",
      error: error.message,
    });
  }
};

export const users = async (req, res) => {
  try {
    const users = await db.User.findAll({
      include: [
        {
          model: db.Role,
          as: "role",
        },
      ],
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while getting users" });
  }
};

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

    if ((!title || !description || !ttlHours, !place)) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + ttlHours);

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
