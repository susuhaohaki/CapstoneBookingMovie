import { configureStore } from "@reduxjs/toolkit";
import quanLyPhimReducer from "./reducers/QuanLyPhimReducer"; // Import reducer đúng cách
import detailMovieReducer from "./reducers/detailMovieReducer";
import quanLyRapReducer from "./reducers/quanLyRapReducer";
import quanLyBookingTicketReducer from "./reducers/quanLyBookingTicketReducer";
import authReducer from "./reducers/authReducer";
import authApi from "../services/authService";
export const store = configureStore({
  reducer: {
    quanLyPhimReducer: quanLyPhimReducer,
    detailMovieReducer: detailMovieReducer,
    quanLyRapReducer: quanLyRapReducer,
    quanLyBookingTicketReducer: quanLyBookingTicketReducer,
    authReducer: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
