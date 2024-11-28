import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    logoutAction: () => {
      localStorage.removeItem("accessToken");
    },
  },
});

export const { logoutAction } = userReducer.actions;

export default userReducer.reducer;
