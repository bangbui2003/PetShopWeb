import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      // if (action.payload === null) {
      //   localStorage.removeItem("token");
      // } else if (action.payload.token) localStorage.setItem("token", action.payload.token);

      state.user = action.payload?.data || action.payload;
      state.token = action.payload.token;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const { comicId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(e => e.comicId.toString() !== comicId.toString());
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    }
  }
});

export const {
  setUser,
  setListFavorites,
  addFavorite,
  removeFavorite, clearUser
} = userSlice.actions;

export default userSlice.reducer;