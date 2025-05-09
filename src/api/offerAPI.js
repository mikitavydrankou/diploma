import axios from "axios";

const api = axios.create({
    baseURL: "http://209.38.205.101:3000/api",
    withCredentials: true,
});

export const fetchOffers = async () => {
    const response = await api.get(`/offer/active`);
    return response.data;
};

export const fetchOfferById = async (offerId) => {
    const response = await api.get(`/offer/${offerId}`);
    return response.data;
};

export const createOffer = async (data) => {
    const response = await api.post(`/offer`, data);
    return response.data;
};

export const deleteOffer = async (id) => {
    const response = await api.delete(`/offer/${id}`);
    return response.data;
};
