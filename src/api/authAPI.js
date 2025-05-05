import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const signin = (username, password) => {
    console.log("signin request sent");
    const response = api.post(`/signin`, { username, password });
    return response;
};

export const signup = (username, link, password) => {
    console.log("signup request sent");
    const response = api.post(`/signup`, { username, link, password });
    return response;
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
