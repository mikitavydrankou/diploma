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
        place: {
            type: Sequelize.ENUM(
                "DS1",
                "DS2",
                "DS3",
                "DS4",
                "DS6",
                "DS7",
                "DS8",
                "DS119"
            ),
            allowNull: false,
            validate: {
                isIn: {
                    args: [
                        [
                            "DS1",
                            "DS2",
                            "DS3",
                            "DS4",
                            "DS6",
                            "DS7",
                            "DS8",
                            "DS119",
                        ],
                    ],
                    msg: "Nie ma takiej opcji",
                },
            },
        },
        counter_offer: {
            type: Sequelize.STRING,
            defaultValue: "Oczekuje na propozycje w FB",
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
