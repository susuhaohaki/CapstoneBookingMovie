import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeThongRap } from './quanLyRapReducer';

// ----- action thunk -----
export const getDetailMovieAPI = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        {
          headers: {
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
      dispatch(setMovieDetail(result.data.content));
      dispatch(setMovieLoading(false)); // Kết thúc loading khi thành công
    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
      dispatch(setMovieError(true)); 
      dispatch(setMovieLoading(false)); // Kết thúc loading khi có lỗi
    }
  };
};

const initialState = {
  movieDetail: {},
  error: false,  // Trạng thái lỗi
  heThongRap: {},
};

const detailMovieReducer = createSlice({
  name: "detailMovieReducer",
  initialState,
  reducers: {
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
      state.error = false; 
    },
    setMovieError: (state, action) => { 
      state.error = action.payload;
    },
    setMovieLoading: (state, action) => { 
      state.loading = action.payload;
    },
    setHeThongRapDetailPhim : (state, action) => {
      state.heThongRap = action.payload;
    },
  },
});
export const { setMovieDetail, setMovieError, setMovieLoading,setHeThongRapDetailPhim } = detailMovieReducer.actions;
export default detailMovieReducer.reducer;
