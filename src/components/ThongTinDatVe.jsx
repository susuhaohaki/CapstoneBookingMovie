import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { huyGheBookingTicket } from "../store/reducers/quanLyBookingTicketReducer";

const ThongTinDatVe = () => {
  const { thongTinPhim, danhSachGheDangDat } = useSelector(
    (state) => state.quanLyBookingTicketReducer,
  );
  console.log("🚀 ~ ThongTinDatVe ~ danhSachGheDangDat:", danhSachGheDangDat);
  const dispatch = useDispatch();
  return (
    <div className="py-6 text-white">
      {" "}
      {/* Text màu trắng để tương phản với nền tối */}
      <h1 className="mb-8 text-center text-4xl font-bold text-orange-500">
        THÔNG TIN ĐẶT VÉ
      </h1>
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
        {" "}
        {/* Nền tối hơn một chút để tạo độ nổi, viền để rõ khối */}
        <h2 className="text-2xl font-semibold text-blue-400">
          {thongTinPhim.tenPhim}
        </h2>{" "}
        {/* Màu xanh nhạt hơn để dịu mắt */}
        <p className="mt-2 text-lg text-gray-300">
          <strong>Địa chỉ:</strong> {thongTinPhim.diaChi}
        </p>{" "}
        {/* Text xám nhạt để dễ đọc */}
        <p className="mt-2 text-lg text-gray-300">
          <strong>Giờ chiếu:</strong> {thongTinPhim.gioChieu}
        </p>
        <p className="mt-2 text-lg text-gray-300">
          <strong>Ngày chiếu:</strong> {thongTinPhim.ngayChieu}
        </p>
        <p className="mt-2 text-lg text-gray-300">
          <strong>Cụm rạp:</strong> {thongTinPhim.tenCumRap}
        </p>
        <p className="mt-2 text-lg text-gray-300">
          <strong>Rạp:</strong> {thongTinPhim.tenRap}
        </p>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-yellow-400 shadow-md"></div>
          <div className="text-lg font-semibold">Ghế đã đặt</div>{" "}
          {/* Bỏ `text-white` để màu chữ tự động trắng */}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-green-400 shadow-md"></div>
          <div className="text-lg font-semibold">Ghế đang đặt</div>{" "}
          {/* Bỏ `text-white` để màu chữ tự động trắng */}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg border-2 border-gray-500 bg-gray-700 shadow-md"></div>{" "}
          {/* Màu nền và viền tối hơn */}
          <div className="text-lg font-semibold">Ghế chưa đặt</div>{" "}
          {/* Bỏ `text-white` để màu chữ tự động trắng */}
        </div>
      </div>
      {/* Scrollable Table Container */}
      <div className="mt-5 max-h-[400px] overflow-y-auto rounded-lg border border-gray-300 text-center shadow-md">
        <table className="w-full table-auto border-collapse text-center text-gray-600">
          <thead>
            <tr className="bg-gray-100 text-xl font-bold text-gray-700">
              <th className="border-b border-gray-300 px-6 py-3">Số ghế</th>
              <th className="border-b border-gray-300 px-6 py-3">Giá</th>
              <th className="border-b border-gray-300 px-6 py-3">Action</th>
            </tr>
          </thead>
          {danhSachGheDangDat.length > 0 ? (
            <tbody className="bg-white">
              {danhSachGheDangDat.map((gheDangDat, index) => (
                <tr key={index} className="text-lg">
                  <td className="border-b border-gray-200 py-2 font-medium text-yellow-600">
                    {gheDangDat.soGhe} (loại : {gheDangDat.loaiGhe})
                  </td>
                  <td className="border-b border-gray-200 py-2 font-medium text-yellow-600">
                    {gheDangDat.giaVe.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="border-b border-gray-200 py-2">
                    <button
                      onClick={() =>
                        dispatch(huyGheBookingTicket(gheDangDat.soGhe))
                      } // Using `soGhe` to cancel the correct seat
                      className="rounded-md bg-red-500 px-4 py-2 text-white shadow-sm transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}

              <tr className="bg-gray-50 text-lg font-semibold text-gray-700">
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
                  <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
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
