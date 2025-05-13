import axios from "axios";

const api = axios.create({
    baseURL: "https://api.kortowo.ninja/api",
    withCredentials: true,
});

export const getUserCount = async () => {
    try {
        const res = await api.get("/count");
        console.log(res.data.count);
        return res.data.count;
    } catch (error) {
        return null;
    }
};
