// api/offerAPI.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/offer";

export const createOffer = (data, token) => {
  return axios.post(API_URL, data, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const deleteOffer = (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const fetchOffers = () => {
  return axios.get(`${API_URL}s/active`);
};

export const fetchOfferById = (offerId) => {
  return axios.get(`${API_URL}/${offerId}`);
};
