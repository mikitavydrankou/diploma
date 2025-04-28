import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/authReducers";
import offerReducer from "./reducers/offerReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  offer: offerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => console.log("State updated:", store.getState()));

export default store;
