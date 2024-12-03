import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ----- action thunk -----
export const getAllFilmAPI = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
        {
          headers: {
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
      const actionPayload = setFilmAction(result.data.content);
      dispatch(actionPayload);
    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
    }
  };
};

// Initial state
const initialState = {
  arrayFilm: [],
  filteredFilms: [],
};

const quanLyPhimReducer = createSlice({
  name: "quanLyPhimReducer",
  initialState,
  reducers: {
    setFilmAction: (state, action) => {
      state.arrayFilm = action.payload;
    },
    setFilteredFilmsAction: (state, action) => {
      state.filteredFilms = action.payload
    },
  },
});

export const { setFilmAction, setFilteredFilmsAction } = quanLyPhimReducer.actions;
export default quanLyPhimReducer.reducer;