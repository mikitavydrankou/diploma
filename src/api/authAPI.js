import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const signin = (username, password) => {
    console.log("signin request sent");
    return api.post(`/signin`, { username, password });
};

export const signup = (username, email, link, password) => {
    console.log("signup request sent");
    return api.post(`/signup`, { username, email, link, password });
};

export const checkauth = () => {
    console.log("checkauth request sent");
    return api
        .get("/me")
        .then((res) => res.data)
        .catch(() => null);
};

export const signout = () => {
    try {
        api.post("/signout");
    } catch (error) {
        console.error("Logout error:", error);
    }
};
