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
