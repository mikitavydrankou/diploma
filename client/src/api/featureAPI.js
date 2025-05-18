import axios from "axios";

const api = axios.create({
    baseURL: "https://api.kortowo.ninja/api",
    withCredentials: true,
});

export const getUserCount = async () => {
    try {
        const res = await api.get("/count");
        return res.data.count;
    } catch (error) {
        return null;
    }
};

export const getOfferCount = async () => {
    try {
        const res = await api.get("/offer/count");
        return res.data.count;
    } catch (error) {
        return null;
    }
};
