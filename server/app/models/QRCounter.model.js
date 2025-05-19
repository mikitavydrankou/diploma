const QRCounter = (sequelize, DataTypes) => {
    return sequelize.define(
        "QRCounter",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            code: { type: DataTypes.STRING, unique: true },
            hits: { type: DataTypes.INTEGER, defaultValue: 0 },
        },
        {
            tableName: "qr_counters",
            timestamps: false,
        }
    );
};

export default QRCounter;
