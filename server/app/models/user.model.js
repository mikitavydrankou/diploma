const userModel = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Username cannot be empty",
                },
                len: {
                    args: [3, 25],
                    msg: "Username must be between 3 and 25 characters",
                },
                is: {
                    args: /^[a-zA-Z0-9_]+$/i,
                    msg: "Username can only contain letters, numbers and underscores",
                },
            },
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: "Password cannot be empty",
                },
            },
        },
        link: {
            type: Sequelize.STRING,
            unique: {
                name: "unique_facebook_link",
                msg: "This Facebook link is already in use",
            },
            validate: {
                isFacebookUrl(value) {
                    const facebookPattern =
                        /^(https?:\/\/)?(www\.|m\.)?(facebook|fb)\.com\/[\S]+$/i;

                    if (!facebookPattern.test(value)) {
                        throw new Error(
                            "Invalid Facebook link format. Please provide a valid URL."
                        );
                    }
                },
                len: {
                    args: [0, 500],
                    msg: "Facebook link must be less than 500 characters",
                },
            },
        },
    });

    return User;
};

export default userModel;
