import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDetailMovieAPI,
  setHeThongRapDetailPhim,
} from "../store/reducers/detailMovieReducer";
import { useDispatch, useSelector } from "react-redux";
const DetailMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, error, heThongRap } = useSelector(
    (state) => state.detailMovieReducer,
  );
  const [movieId, setMovieId] = useState("");
  const [iframeSrc, setIframeSrc] = useState(
    `https://www.youtube.com/embed/${movieId}`,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIframeSrc(`https://www.youtube.com/embed/${movieId}`);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIframeSrc("");
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getDetailMovieAPI(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(movieDetail).length > 0) {
      const { heThongRapChieu } = movieDetail;
      const heThongRap = heThongRapChieu[0];
      dispatch(setHeThongRapDetailPhim(heThongRap));
    }
  }, [movieDetail, dispatch]);

  useEffect(() => {
    if (movieDetail.trailer) {
      const movieID = movieDetail.trailer.split("v=")[1];
      setMovieId(movieID);
    }
  }, [movieDetail]);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl text-red-600">
          Có lỗi khi tải thông tin phim. Vui lòng thử lại sau!
        </h2>
      </div>
    );
  }

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
        <div className="flex-1 space-y-6">
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
            <div
              className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700"
              onClick={() => showModal()}
            >
              Xem Trailer
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
            {/* Kiểm tra nếu không có heThongRap hoặc cumRapChieu rỗng */}
            {heThongRap &&
            heThongRap.cumRapChieu &&
            heThongRap.cumRapChieu.length > 0 ? (
              <>
                {/* Logo hệ thống rạp */}
                <div className="col-span-1 hidden lg:col-span-1 lg:block">
                  <img
                    src={heThongRap.logo}
                    alt="Logo hệ thống rạp"
                    className="hidden w-full lg:block"
                  />
                </div>

                {/* Thông tin cụm rạp */}
                <div className="col-span-1 mx-auto lg:col-span-5">
                  {heThongRap.cumRapChieu.map((cumRap, index) => (
                    <div
                      key={index}
                      className="mb-4 flex items-center space-x-2"
                    >
                      <img
                        src={cumRap.hinhAnh}
                        alt={`Logo cụm rạp ${cumRap.tenCumRap}`}
                        className="w-16 rounded-lg"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-orange-500">
                          {cumRap.tenCumRap}
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                          {cumRap.diaChi}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Thông tin lịch chiếu phim */}
                <div className="col-span-1 lg:col-span-6">
                  {heThongRap.cumRapChieu.map((cumRap) =>
                    cumRap.lichChieuPhim.map((lichChieu) => (
                      <div
                        key={lichChieu.maLichChieu}
                        className="mb-4 flex flex-col items-start space-x-0 sm:flex-row sm:items-center sm:space-x-4"
                      >
                        {/* Thông tin lịch chiếu */}
                        <div className="w-full sm:w-full">
                          <h3 className="text-xl font-semibold text-orange-500">
                            {lichChieu.tenPhim}
                          </h3>
                          <div className="mt-2 flex flex-col justify-between gap-2 text-sm text-gray-400 sm:flex-row">
                            <span>
                              Thời gian:{" "}
                              {new Date(
                                lichChieu.ngayChieuGioChieu,
                              ).toLocaleDateString()}
                            </span>

                            <span>
                              Giá vé: {lichChieu.giaVe.toLocaleString()} VND
                            </span>
                            <span>Thời lượng: {lichChieu.thoiLuong} phút</span>
                          </div>
                          <a
                            href={`/ticketroom/${lichChieu.maLichChieu}`}
                            className="mt-2 inline-block h-[36px] w-full rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-orange-500 hover:text-white focus:outline-none sm:w-auto"
                          >
                            {new Date(
                              lichChieu.ngayChieuGioChieu,
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </a>
                        </div>
                      </div>
                    )),
                  )}
                </div>
              </>
            ) : (
              <div className="col-span-1 text-center text-lg text-gray-500 lg:col-span-12">
                Không có dữ liệu hệ thống rạp.
              </div>
            )}
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
              <button
                className="cursor-pointer text-white"
                onClick={() => handleCancel()}
              >
                <i className="fas fa-times" />
              </button>
            </div>
            {/* Modal Body (Iframe Video) */}
            <div className="lg:h-128 xl:h-160 relative h-64 w-full sm:h-80 md:h-96">
              <iframe
                className="h-full w-full"
                src={iframeSrc}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
