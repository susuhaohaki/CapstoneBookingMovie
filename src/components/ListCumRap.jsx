import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDanhSachPhim } from "../store/reducers/quanLyRapReducer";

const ListCumRap = () => {
  const { cumRap } = useSelector((state) => state.quanLyRapReducer);
  const dispatch = useDispatch();
  const [maCumRap, setMaCumRap] = useState(null);

  useEffect(() => {
    if (cumRap.length > 0) {
      const initialMaCumRap = cumRap[0].maCumRap; // Lấy mã cụm rạp đầu tiên
      setMaCumRap(initialMaCumRap); // Cập nhật state
    }
  }, [cumRap]);
  useEffect(() => {
    if (maCumRap && cumRap.length > 0) {
      const foundCumRap = cumRap.find((cumRap) => cumRap.maCumRap === maCumRap);
      if (foundCumRap) {
        dispatch(setDanhSachPhim(foundCumRap.danhSachPhim));
      }
    }
  }, [maCumRap, dispatch, cumRap]);

  if (cumRap.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-[400px] flex-col gap-4 overflow-y-auto bg-gray-900 p-4 lg:h-[520px] lg:border-r lg:border-gray-300">
      {cumRap.map((rap, index) => {
        return (
          <div
            key={index}
            className={`p-4transition flex cursor-pointer items-center gap-4 rounded-lg border-b border-gray-600 duration-300 ease-in-out hover:bg-gray-700 hover:text-orange-500 ${rap.maCumRap === maCumRap ? "bg-gray-700 text-orange-500" : "text-white"}`}
            onClick={() => setMaCumRap(rap.maCumRap)}
          >
            <img
              className="h-12 w-12 rounded-lg object-cover lg:h-16 lg:w-16"
              src={rap.hinhAnh}
              alt={rap.tenCumRap}
            />
            <div className="flex flex-col">
              <h3 className="text-base font-semibold lg:text-lg">
                {rap.tenCumRap}
              </h3>
              <p className="text-sm text-gray-400 lg:text-base">{rap.diaChi}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListCumRap;
