import verifySignUp from "../middleware/verifySignUp.js";
import { signin, signup, signout } from "../controllers/auth.controller.js";

const auth = function (app) {
    app.post(
        "/api/auth/signup",
        [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
        signup
    );

    app.post("/api/auth/signin", signin);

    app.post("/api/auth/signout", signout);
};

export default auth;
