import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    logoutAction:() => {
        localStorage.removeItem('accessToken'); 
    }
  }
});

export const {logoutAction} = UserReducer.actions

export default UserReducer.reducer