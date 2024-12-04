import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDanhSachGhe, setThongTinPhim } from "../../store/reducers/quanLyBookingTicketReducer";
import DanhSachGheBookingTichket from "../../components/DanhSachGheBookingTichket";
import ThongTinDatVe from "../../components/ThongTinDatVe";

const BookTicketPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getDanhSachGheAPI = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_MOVIE_URL}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`, {headers: {TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT}});
      console.log("🚀 ~ getDanhSachGheAPI ~ res.data.content:", res.data.content)
      dispatch(setThongTinPhim(res.data.content.thongTinPhim))
      dispatch(setDanhSachGhe(res.data.content.danhSachGhe));
    } catch (error) {
      console.log("🚀 ~ getDanhSachGheAPI ~ error:", error)
    }
  }
  useEffect(() => {
    getDanhSachGheAPI();
  },[])
  return (
    <div className="container mx-auto px-4 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-6">
        <DanhSachGheBookingTichket />
      </div>
      <div className="col-span-12 lg:col-span-6">
      <ThongTinDatVe/>
      </div>
    </div>
  );
};

export default BookTicketPage;
