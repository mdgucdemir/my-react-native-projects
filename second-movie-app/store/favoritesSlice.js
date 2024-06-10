import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const { addFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
