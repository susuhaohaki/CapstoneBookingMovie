import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    danhSachGhe:[],
    danhSachGheTheoHang:[],
    thongTinPhim:{},
    danhSachGheDangDat: [],
}

const quanLyBookingTicketReducer = createSlice({
  name: "quanLyBookingTicketReducer",
  initialState,
  reducers: {
    setDanhSachGhe: (state, action) => {
        state.danhSachGhe = action.payload
    },
    setDanhSachGheTheoHang: (state, action) => {
        state.danhSachGheTheoHang = action.payload
    },
    setThongTinPhim: (state, action) => {
        state.thongTinPhim = action.payload
    },
    setDanhSachGeDaDat : (state, action) => {
        let index = state.danhSachGheDangDat.findIndex(
            (gheDangDat) => gheDangDat.maGhe === action.payload.maGhe
        );

        if (index !== -1) {
            // If the seat exists, remove it
            state.danhSachGheDangDat.splice(index, 1);
        } else {
            // Otherwise, add the seat to the danhSachGheDaDat array
            state.danhSachGheDangDat.push(action.payload);
        }
    },
    huyGheBookingTicket: (state, action) => {
        // Find the index of the seat to be removed by its `soGhe`
        const index = state.danhSachGheDangDat.findIndex(
            (gheDangDat) => gheDangDat.soGhe === action.payload
        );

        // If the seat exists, remove it from danhSachGheDangDat
        if (index !== -1) {
            state.danhSachGheDangDat.splice(index, 1);
        }
    },

    
  }
});

export const {setDanhSachGhe,setDanhSachGheTheoHang,setThongTinPhim,setDanhSachGeDaDat,huyGheBookingTicket} = quanLyBookingTicketReducer.actions

export default quanLyBookingTicketReducer.reducer