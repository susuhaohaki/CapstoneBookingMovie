import { configureStore } from "@reduxjs/toolkit";
import quanLyPhimReducer from "./reducers/QuanLyPhimReducer"; // Import reducer đúng cách
import detailMovieReducer from "./reducers/detailMovieReducer";
import quanLyRapReducer from "./reducers/quanLyRapReducer";
import quanLyBookingTicketReducer from "./reducers/quanLyBookingTicketReducer";
export const store = configureStore({
  reducer: {
    quanLyPhimReducer: quanLyPhimReducer ,
    detailMovieReducer: detailMovieReducer,
    quanLyRapReducer:quanLyRapReducer,
    quanLyBookingTicketReducer:quanLyBookingTicketReducer
  }
});
