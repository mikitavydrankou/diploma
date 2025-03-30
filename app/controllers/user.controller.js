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

export const getActiveOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll({
      where: {
        status: "active",
        expiresAt: { [db.Sequelize.Op.gt]: new Date() },
      },
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
  console.log(req.body);
  try {
    const { title, description, ttlHours } = req.body;

    if (!title || !description || !ttlHours) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + ttlHours);

    console.log("Creating offer");

    const offer = await Offer.create({
      title,
      description,
      ttlHours,
      expiresAt,
      userId: req.userId,
      status: "active",
    });

    res.status(201).json(offer);
  } catch (err) {
    console.error("Ошибка создания:", err);
    res.status(500).json({ message: "Cant create offer" });
  }
};
