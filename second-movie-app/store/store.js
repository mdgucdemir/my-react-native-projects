import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    favoriteMovie: favoritesReducer,
  },
});

export default store;
