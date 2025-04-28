import {
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  CREATE_OFFER_FAIL,
  OFFERS_FETCH_REQUEST,
  OFFERS_FETCH_SUCCESS,
  OFFERS_FETCH_FAIL,
  OFFER_FETCH_REQUEST,
  OFFER_FETCH_SUCCESS,
  OFFER_FETCH_FAIL,
} from "../actions/types.js";

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

    case OFFER_FETCH_REQUEST:
      return { ...state, isLoading: true, error: null };

    case OFFER_FETCH_SUCCESS:
      return {
        ...state,
        offers: state.offers.some((item) => item.id === action.payload.id)
          ? state.offers
          : [...state.offers, action.payload],
        currentOffer: action.payload,
        isLoading: false,
      };

    case OFFER_FETCH_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    case OFFERS_FETCH_REQUEST:
      return { ...state, isLoading: true, error: null };
    case OFFERS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offers: action.payload,
      };
    case OFFERS_FETCH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
