import { configureStore } from "@reduxjs/toolkit";
import quanLyPhimReducer from "./reducers/QuanLyPhimReducer"; // Import reducer đúng cách
import detailMovieReducer from "./reducers/detailMovieReducer";
export const store = configureStore({
  reducer: {
    quanLyPhimReducer: quanLyPhimReducer ,
    detailMovieReducer: detailMovieReducer
  }
});
