import {
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAIL,
} from "../actions/types";

const initialState = {
  isLoading: false,
  error: null,
  offers: [],
};

export default function offerReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_OFFER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CREATE_OFFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offers: [...state.offers, action.payload],
      };

    case CREATE_OFFER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
