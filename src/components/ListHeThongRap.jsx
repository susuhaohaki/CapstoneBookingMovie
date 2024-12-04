import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThongTinLichChieuHeThongRapAPI, setCumRap } from "../store/reducers/quanLyRapReducer";

const ListHeThongRap = () => {
  const { heThongRap, thongTinLichChieuHeThongRap } = useSelector((state) => state.quanLyRapReducer);
  const [maHeThongRap, setMaHeThongRap] = useState(null); 
  const [selectedMaHeThongRap, setSelectedMaHeThongRap] = useState(null);  // Thêm state để theo dõi hệ thống rạp được chọn
  const dispatch = useDispatch();

  useEffect(() => {
    if (heThongRap.length > 0) {
      setMaHeThongRap(heThongRap[0]?.maHeThongRap);
    }
  }, [heThongRap]); 

  useEffect(() => {
    if (maHeThongRap) {
      dispatch(getThongTinLichChieuHeThongRapAPI(maHeThongRap));
    }
  }, [maHeThongRap, dispatch]); 

  useEffect(() => {
    if (thongTinLichChieuHeThongRap.length > 0) {
      dispatch(setCumRap(thongTinLichChieuHeThongRap[0].lstCumRap));
    }
  }, [thongTinLichChieuHeThongRap, dispatch]);

  const handleClick = (maHeThongRap) => {
    setMaHeThongRap(maHeThongRap);
    setSelectedMaHeThongRap(maHeThongRap);  // Cập nhật state khi click
  };

  return (
    <div className="flex flex-row lg:flex-col items-center gap-4 overflow-x-auto lg:overflow-y-auto px-4 py-2 lg:px-0 lg:py-4">
      {heThongRap.map((heThongRap, index) => (
        <img
          key={index}
          src={heThongRap.logo}
          alt={heThongRap.logo}
          className={`h-14 w-14 lg:h-16 lg:w-16 rounded-full border 
            hover:opacity-70 cursor-pointer 
            ${selectedMaHeThongRap === heThongRap.maHeThongRap ? ' border-8 border-orange-400 bg-orange-100' : 'border-gray-500'}`} // Thêm viền và nền khi được chọn
          onClick={() => handleClick(heThongRap.maHeThongRap)} 
        />
      ))}
    </div>
  );
};

export default ListHeThongRap;
