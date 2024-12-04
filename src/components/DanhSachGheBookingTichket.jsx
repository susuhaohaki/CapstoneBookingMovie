import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDanhSachGeDaDat,
  setDanhSachGheTheoHang,
} from "../store/reducers/quanLyBookingTicketReducer";

const DanhSachGheBookingTichket = () => {
  const { danhSachGhe, danhSachGheTheoHang, danhSachGheDangDat } = useSelector(
    (state) => state.quanLyBookingTicketReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (danhSachGhe.length > 0) {
      const hangGheChuCai = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
      ];
      let sttTruoc = 0;
      let sttSau = 10;
      const newDanhSachGheTheoHang = hangGheChuCai.map((hang) => {
        const gheCuaHang = danhSachGhe.filter(
          (ghe) => ghe.stt > sttTruoc && ghe.stt <= sttSau,
        );

        // Cập nhật lại sttTruoc và sttSau cho lần lặp tiếp theo
        sttTruoc += 10;
        sttSau += 10;

        // Trả về đối tượng chứa tên hàng và danh sách ghế của hàng đó
        return {
          hangGhe: hang,
          danhSachGhe: gheCuaHang,
        };
      });
      dispatch(setDanhSachGheTheoHang(newDanhSachGheTheoHang));
    }
  }, [danhSachGhe, dispatch]);

  if (danhSachGhe.length === 0) {
    return (
      <div className="flex items-center justify-center text-white">
        <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="mb-8 text-center text-4xl font-bold text-orange-500">
        ĐẶT GHẾ XEM PHIM
      </h1>
      <div className="flex flex-col gap-4">
        {danhSachGheTheoHang.map((hang, index) => {
          let sttGhe = 0;
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-center text-lg font-bold text-white">
                {hang.hangGhe}
              </div>
              {hang.danhSachGhe.map((ghe, index) => {
                const isGheDangDat = danhSachGheDangDat.some(
                  (gheDangDat) => gheDangDat.maGhe === ghe.maGhe,
                );
                return (
                  <div
                    key={index}
                    className={`${
                      ghe.daDat
                        ? "cursor-not-allowed bg-yellow-400" 
                        : isGheDangDat
                          ? "cursor-pointer border border-gray-500 bg-green-400 text-white hover:border-green-700 hover:bg-green-500 hover:text-white" 
                          : "cursor-pointer border border-gray-500 bg-gray-700 text-white hover:border-green-700 hover:bg-green-500 hover:text-white" 
                    } mx-1 my-2 flex h-12 w-12 items-center justify-center rounded-md transition-all duration-300 ease-in-out`}
                    onClick={() =>
                      dispatch(
                        setDanhSachGeDaDat({
                          maGhe: ghe.maGhe,
                          loaiGhe: ghe.loaiGhe,
                          giaVe: ghe.giaVe,
                          soGhe:
                            hang.hangGhe +
                            (ghe.stt % 10 === 0 ? 10 : ghe.stt % 10),
                        }),
                      )
                    }
                  >
                    {hang.hangGhe}
                    {(sttGhe += 1)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DanhSachGheBookingTichket;
