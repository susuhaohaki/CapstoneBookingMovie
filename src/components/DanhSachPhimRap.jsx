import { useSelector } from "react-redux";

const DanhSachPhimRap = () => {
  const { danhSachPhim } = useSelector((state) => state.quanLyRapReducer);
  if (danhSachPhim.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-[400px] flex-col gap-4 overflow-y-auto bg-gray-900 p-4 lg:h-[520px] lg:border-r lg:border-gray-300">
      {danhSachPhim.map((phim) => {
        return (
          <div
            key={phim.maPhim}
            className="flex cursor-pointer items-center gap-4 rounded-lg border-b border-gray-600 p-4 text-white transition duration-300 ease-in-out"
          >
            <img
              className="w-20 rounded-lg object-cover lg:h-20 lg:w-20"
              src={phim.hinhAnh}
              alt={phim.tenPhim}
            />
            <div className="flex w-full flex-col">
              <h3 className="text-lg font-bold text-orange-500 lg:text-xl">
                {phim.tenPhim}
              </h3>
              <div className="flex h-[100px] flex-wrap gap-2 overflow-y-auto md:h-full">
                {phim.lstLichChieuTheoPhim.map((lichChieu, index) => {
                  return (
                    <a
                      href={`/ticketroom/${lichChieu.maLichChieu}`}
                      key={index}
                      className="inline-block h-[36px] rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-orange-500 hover:text-white focus:outline-none"
                    >
                      {new Date(lichChieu.ngayChieuGioChieu).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DanhSachPhimRap;
