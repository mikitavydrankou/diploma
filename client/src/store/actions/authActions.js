import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "./types.js";
import { loginUser, registerUser } from "../../api/authAPI.js";

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await loginUser(username, password);
    const {
      accessToken,
      id,
      username: responseUsername,
      email,
      roles,
      link,
    } = response.data;

    localStorage.setItem("token", accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        accessToken,
        user: {
          id,
          username: responseUsername,
          email,
          roles,
          link,
        },
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

export const register =
  (username, email, password, link) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const response = await registerUser(username, email, password, link);
      const {
        accessToken,
        id,
        email: userEmail,
        roles,
        link: userLink,
      } = response.data;

      localStorage.setItem("token", accessToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          accessToken,
          user: { id, username, email: userEmail, roles, link: userLink },
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response?.data?.message || "Registration failed",
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
