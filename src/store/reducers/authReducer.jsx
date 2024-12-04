import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { taiKhoan, matKhau, email, soDt, maNhom, hoTen },
    { rejectWithValue },
  ) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyNguoiDung/DangKy`,
        {
          taiKhoan,
          matKhau,
          email,
          soDt,
          maNhom,
          hoTen,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
const loginUser = createAsyncThunk(
  "auth/login",
  async ({ taiKhoan, matKhau }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyNguoiDung/DangNhap`,
        {
          taiKhoan,
          matKhau,
        },
        {
          headers: {
            "Content-Type": "application/json",
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
      // localStorage.setItem("userToken", response.data.content.accessToken);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
const initialState = {
  isLoading: false,
  user: null,
  token: null,
  error: null,
  isSuccess: false,
};
const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.content;
        state.token = action.payload.content.accessToken;
        state.isSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { logout, setCredentials } = authReducer.actions;
export { registerUser, loginUser };
export default authReducer.reducer;
