import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// ----- action thunk -----
export const getDetailMovieAPI = (maPhim) => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Bắt đầu loading
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
        {
          headers: {
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
      dispatch(setMovieDetail(result.data.content));
      dispatch(setLoading(false)); // Kết thúc loading khi thành công
    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
      dispatch(setError(true)); 
      dispatch(setLoading(false)); // Kết thúc loading khi có lỗi
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
      state.error = false; // Reset lỗi khi có dữ liệu phim mới
    },
    setError: (state, action) => {
      state.error = action.payload; // Cập nhật trạng thái lỗi
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Cập nhật trạng thái loading
    },
  },
});

export const { setMovieDetail, setError, setLoading } = detailMovieReducer.actions;

export default detailMovieReducer.reducer;