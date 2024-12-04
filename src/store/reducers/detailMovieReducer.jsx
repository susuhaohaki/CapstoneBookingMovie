import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// ----- action thunk -----
export const getDetailMovieAPI = (maPhim) => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Bắt đầu loading
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
  loading: false, // Trạng thái loading
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
  },
});
export const { setMovieDetail, setMovieError, setMovieLoading } = detailMovieReducer.actions;
export default detailMovieReducer.reducer;
