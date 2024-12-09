import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { huyGheBookingTicket } from "../store/reducers/quanLyBookingTicketReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ThongTinDatVe = () => {
  const { thongTinPhim, danhSachGheDangDat } = useSelector(
    (state) => state.quanLyBookingTicketReducer,
  );
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.authReducer);
  useEffect(() => {
    console.log(danhSachGheDangDat)
  }, [danhSachGheDangDat]);
  const handleThanhToan = async() => {
    try {
      const danhSachGhe = danhSachGheDangDat.map((ghe) => ({
        maGhe: ghe.maGhe,
        giaVe: ghe.giaVe
      }));
      const result = await axios.post(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyDatVe/DatVe`,
        { 
          maLichChieu: thongTinPhim.maLichChieu,
          danhSachVe: danhSachGhe
        },{
          headers: {
            Authorization: "Bearer " + token,
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
      if(result.data.statusCode === 200) {
        alert(result.data.content);
        window.location.reload()      
      }
    } catch (error) {
      console.log(error)
      alert("Vui lòng đăng nhập")
      navigate("/login")
    }
  };
  const dispatch = useDispatch();
  return (
    <div className="py-6 text-white">
      <h1 className="mb-8 text-center text-4xl font-bold text-orange-500">
        THÔNG TIN ĐẶT VÉ
      </h1>
      <div className="rounded-lg border border-gray-600 bg-gray-900 p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-blue-400">
          {thongTinPhim.tenPhim}
        </h2>
        <p className="mt-2 text-lg text-gray-400">
          <strong>Địa chỉ:</strong> {thongTinPhim.diaChi}
        </p>
        <p className="mt-2 text-lg text-gray-400">
          <strong>Giờ chiếu:</strong> {thongTinPhim.gioChieu}
        </p>
        <p className="mt-2 text-lg text-gray-400">
          <strong>Ngày chiếu:</strong> {thongTinPhim.ngayChieu}
        </p>
        <p className="mt-2 text-lg text-gray-400">
          <strong>Cụm rạp:</strong> {thongTinPhim.tenCumRap}
        </p>
        <p className="mt-2 text-lg text-gray-400">
          <strong>Rạp:</strong> {thongTinPhim.tenRap}
        </p>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-yellow-400 shadow-lg"></div>
          <div className="text-lg font-semibold text-gray-200">Ghế đã đặt</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-500 shadow-lg"></div>
          <div className="text-lg font-semibold text-gray-200">Ghế đang đặt</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg border-2 border-gray-600 bg-gray-700 shadow-lg"></div>
          <div className="text-lg font-semibold text-gray-200">Ghế chưa đặt</div>
        </div>
      </div>
      <div className="mt-5 max-h-[400px] overflow-y-auto rounded-lg border border-gray-300 text-center shadow-lg bg-gray-800">
        <table className="w-full table-auto border-collapse text-center text-gray-300">
          <thead>
            <tr className="bg-gray-700 text-xl font-bold text-gray-200">
              <th className="border-b border-gray-600 px-6 py-3">Số ghế</th>
              <th className="border-b border-gray-600 px-6 py-3">Giá</th>
              <th className="border-b border-gray-600 px-6 py-3">Action</th>
            </tr>
          </thead>
          {danhSachGheDangDat.length > 0 ? (
            <tbody className="bg-gray-800">
              {danhSachGheDangDat.map((gheDangDat, index) => (
                <tr key={index} className="text-lg">
                  <td className="border-b border-gray-600 py-2 font-medium text-yellow-400">
                    {gheDangDat.soGhe} (loại : {gheDangDat.loaiGhe})
                  </td>
                  <td className="border-b border-gray-600 py-2 font-medium text-yellow-400">
                    {gheDangDat.giaVe.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="border-b border-gray-600 py-2">
                    <button
                      onClick={() =>
                        dispatch(huyGheBookingTicket(gheDangDat.soGhe))
                      }
                      className="rounded-md bg-red-600 px-4 py-2 text-white shadow-md transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-700 text-lg font-semibold text-gray-300">
                <td className="py-3">Tổng tiền</td>
                <td className="py-3">
                  {danhSachGheDangDat
                    .reduce((total, gheDangDat) => total + gheDangDat.giaVe, 0)
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                </td>
                <td className="py-3">
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={()=>handleThanhToan()}>
                    Thanh toán
                  </button>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan="3"
                  className="py-4 text-lg font-medium text-gray-500"
                >
                  Hiện chưa có ghế nào được đặt.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default ThongTinDatVe;
