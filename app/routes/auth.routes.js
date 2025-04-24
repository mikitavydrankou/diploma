import verifySignUp from "../middleware/verifySignUp.js";
import { signin, signup, signout } from "../controllers/auth.controller.js";

const auth = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        signup
    );

    app.post("/api/auth/signin", signin);

    app.post("/api/auth/signout", signout);
};

export default auth;
