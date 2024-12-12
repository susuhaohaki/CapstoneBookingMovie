import { useEffect } from "react";
import ListHeThongRap from "./ListHeThongRap";
import ListCumRap from "./ListCumRap";
import { getHeThongRapAPI } from "../store/reducers/quanLyRapReducer";
import { useDispatch } from "react-redux";
import DanhSachPhimRap from "./DanhSachPhimRap";

const HeThongRapInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeThongRapAPI());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tiêu đề chính */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-orange-500 lg:text-3xl">
          Hệ Thống Rạp Chiếu Phim
        </h1>
        <p className="mt-2 text-sm text-gray-400 lg:text-base">
          Khám phá các hệ thống rạp, cụm rạp và danh sách phim đang chiếu
        </p>
      </div>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 gap-4 lg:h-[650px] lg:grid-cols-12">
        <div className="col-span-1 border-none lg:col-span-1 lg:border-r lg:border-gray-300">
          <ListHeThongRap />
        </div>
        <div className="col-span-1 lg:col-span-5">
          <ListCumRap />
        </div>
        <div className="col-span-1 lg:col-span-6">
          <DanhSachPhimRap />
        </div>
      </div>
    </div>
  );
};

export default HeThongRapInfo;
