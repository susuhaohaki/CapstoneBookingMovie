import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailMovieAPI } from "../store/reducers/detailMovieReducer";
import { useDispatch, useSelector } from "react-redux";

const DetailMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieDetail, error, loading } = useSelector(
    (state) => state.detailMovieReducer,
  );
  const [movieId,setMovieId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getDetailMovieAPI(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (movieDetail.trailer) {
        const movieID = movieDetail.trailer.split("v=")[1];
        setMovieId(movieID);
    }
  }, [movieDetail]);
  
  // Nếu đang loading, hiển thị component loading
  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl text-red-600">
          Có lỗi khi tải thông tin phim. Vui lòng thử lại sau!
        </h2>
      </div>
    );
  }

  // Nếu không có lỗi và dữ liệu phim đã được tải, hiển thị chi tiết phim
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-8 md:space-y-0">
        {/* Hình ảnh */}
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <img
            src={movieDetail.hinhAnh}
            alt={movieDetail.tenPhim}
            className="w-full rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Chi tiết phim */}
        <div className="flex-1 space-y-6 lg:max-w-[400px]">
          <h1 className="border-b-2 border-red-500 pb-3 text-4xl font-bold text-orange-500">
            {movieDetail.tenPhim}
          </h1>

          <p className="line-clamp-5 text-lg text-gray-400">
            {movieDetail.moTa || "Chưa có mô tả."}
          </p>
          <p className="text-sm text-gray-400">
            <strong>Mã phim:</strong> {movieDetail.maPhim}
          </p>
          <p className="text-sm text-gray-400">
            <strong>Ngày khởi chiếu:</strong>{" "}
            {new Date(movieDetail.ngayKhoiChieu).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-400">
            <strong>Đánh giá:</strong> {movieDetail.danhGia}/10
          </p>
          <p className="text-sm text-gray-400">
            <strong>Trạng thái:</strong>{" "}
            {movieDetail.dangChieu
              ? "Đang chiếu"
              : movieDetail.sapChieu
                ? "Sắp chiếu"
                : "Đã chiếu"}
          </p>
          <div className="flex gap-6">
            <div className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700 cursor-pointer" onClick={()=>showModal()}>
              Xem Trailer
            </div>
            <button
              onClick={() => alert("Đặt vé thành công!")}
              className="rounded-lg bg-green-600 px-6 py-3 text-white shadow transition hover:bg-green-700"
            >
              Đặt Vé
            </button>
          </div>
        </div>
      </div>
      {/* Modal for Trailer */}
      <div
        id="modal"
        className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 ${!isModalOpen ? "hidden" : ""}`}
      >
        <div className="flex min-h-screen items-center justify-center">
          <div className="mx-4 w-full max-w-4xl overflow-hidden rounded-lg bg-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
              <h2 className="text-xl font-bold">Trailer</h2>
              <button className="text-white cursor-pointer" onClick={()=>handleCancel()}>
                <i className="fas fa-times" />
              </button>
            </div>
            {/* Modal Body (Iframe Video) */}
            <div className="lg:h-128 xl:h-160 relative h-64 w-full sm:h-80 md:h-96">
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${movieId}`} allowFullScreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;