import { configureStore } from "@reduxjs/toolkit";
import quanLyPhimReducer from "./reducers/QuanLyPhimReducer"; // Import reducer đúng cách

export const store = configureStore({
  reducer: {
    quanLyPhimReducer: quanLyPhimReducer // Đặt tên cho state là `quanLyPhim` trong store
  }
});
