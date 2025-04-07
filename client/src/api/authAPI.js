import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const loginUser = (username, password) => {
  return axios.post(`${API_URL}/signin`, { username, password });
};

export const registerUser = (username, email, password, link) => {
  return axios.post(`${API_URL}/signup`, { username, email, password, link });
};
