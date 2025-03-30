const offerModel = (sequelize, Sequelize) => {
  const Offer = sequelize.define("offers", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ttlHours: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    expiresAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("active", "archived"),
      defaultValue: "active",
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Offer;
};

export default offerModel;
