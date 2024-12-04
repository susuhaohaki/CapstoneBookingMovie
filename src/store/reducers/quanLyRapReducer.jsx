import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHeThongRapAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyRap/LayThongTinHeThongRap`,
        {
          headers: {
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        }
      );
      dispatch(setHeThongRap(response.data.content));

    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
      dispatch(setRapError(true));
    }
  };
};

export const getThongTinLichChieuHeThongRapAPI = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`,
        {
          headers: {
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        }
      );
      dispatch(setThongTinLichChieuHeThongRap(response.data.content));

    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
    }
  };
}
const initialState = {
  cumRap: [],
  heThongRap: [],
  error: false,
  thongTinLichChieuHeThongRap: {},
  danhSachPhim: [],
};

const quanLyRapReducer = createSlice({
  name: "quanLyRapReducer",
  initialState,
  reducers: {
    setHeThongRap: (state, action) => {
      state.heThongRap = action.payload;
    },
    setCumRap: (state, action) => {
      state.cumRap = action.payload;
    },
    setRapError: (state, action) => {
      state.error = action.payload;
    },
    setThongTinLichChieuHeThongRap: (state, action) => {
      state.thongTinLichChieuHeThongRap = action.payload;
    },
    setDanhSachPhim: (state, action) => {
      state.danhSachPhim = action.payload;
    },
  },
});

export const { setHeThongRap, setRapError,setCumRap,setThongTinLichChieuHeThongRap,setDanhSachPhim } = quanLyRapReducer.actions;
export default quanLyRapReducer.reducer;
