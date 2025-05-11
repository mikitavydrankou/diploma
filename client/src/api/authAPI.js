import axios from "axios";

const api = axios.create({
    baseURL: "https://api.kortowo.ninja/api/auth",
    withCredentials: true,
});

export const signin = async (username, password) => {
    const response = await api.post(`/signin`, { username, password });
    console.log("signin response: ", response);
    return response;
};

export const signup = async (username, link, password) => {
    const response = await api.post(`/signup`, { username, link, password });
    console.log("signup response: ", response);
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
