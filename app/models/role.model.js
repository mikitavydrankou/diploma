const roleModel = (sequelize, Sequelize) => {
    const Role = sequelize.define(
        "roles",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
        },
        {
            timestamps: false,
            hooks: {
                afterSync: async (options) => {
                    if (options.force || options.alter) {
                        const count = await Role.count();
                        if (count === 0) {
                            await Role.bulkCreate(
                                [
                                    { name: "user" },
                                    { name: "moderator" },
                                    { name: "admin" },
                                ],
                                { validate: true }
                            );
                            console.log("Initial roles created");
                        }
                    }
                },
            },
        }
    );

    return Role;
};

export default roleModel;
