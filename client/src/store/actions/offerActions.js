import {
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAIL,
} from "../actions/types";
import { createOffer } from "../../api/offerAPI";

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
