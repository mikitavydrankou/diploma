import {
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAIL,
  OFFER_FETCH_REQUEST,
  OFFER_FETCH_SUCCESS,
  OFFER_FETCH_FAIL,
  OFFERS_FETCH_REQUEST,
  OFFERS_FETCH_SUCCESS,
  OFFERS_FETCH_FAIL,
} from "../actions/types.js";
import { createOffer, fetchOfferById, fetchOffers } from "../../api/offerAPI";

export const createUserOffer = (offerData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_OFFER_REQUEST });

    const token = getState().auth.token;
    if (!token) {
      throw new Error("No token available");
    }

    const response = await createOffer(
      {
        place: offerData.place,
        title: offerData.title,
        description: offerData.description,
        ttlHours: offerData.ttlHours,
      },
      token
    );

    dispatch({
      type: CREATE_OFFER_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_OFFER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const loadOffers = () => async (dispatch) => {
  try {
    dispatch({ type: OFFERS_FETCH_REQUEST });
    const response = await fetchOffers();
    dispatch({ type: OFFERS_FETCH_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: OFFERS_FETCH_FAIL, payload: error.message });
  }
};

export const loadOfferById = (offerId) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_FETCH_REQUEST });
    const response = await fetchOfferById(offerId);
    dispatch({ type: OFFER_FETCH_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: OFFER_FETCH_FAIL, payload: error.message });
  }
};
