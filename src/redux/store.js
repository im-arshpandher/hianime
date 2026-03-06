import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth";
import swipe1animeReducer from './reducers/swipe1animeSlice';
import swipe2animeReducer from "./reducers/swipe2animeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    swipe1: swipe1animeReducer,
    swipe2anime: swipe2animeReducer,
  },
});

export default store;
