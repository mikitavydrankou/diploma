import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
    withCredentials: true,
});

export const signin = async (username, password) => {
    const response = await api.post(`/signin`, { username, password });
    return response;
};

export const signup = async (username, link, password) => {
    const response = await api.post(`/signup`, { username, link, password });
    return response;
};

export const checkauth = async () => {
    try {
        const res = await api.get("/me");
        return res.data;
    } catch (error) {
        return null;
    }
};

export const signout = () => {
    try {
        api.post("/signout");
    } catch (error) {
        return null;
    }
};
