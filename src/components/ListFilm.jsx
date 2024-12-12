import { useSelector } from "react-redux";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ListFilm = (props) => {
  const { filteredFilms } = useSelector((state) => state.quanLyPhimReducer);
  const { translate } = props;
  const navigate = useNavigate();
  return (
    <div className="relative py-4">
      <div className="film-list-container overflow-x-auto">
        <div
          className="flex space-x-4 transition-transform duration-300"
          style={{ transform: `translateX(${translate}px)` }}
        >
          {filteredFilms?.map((film) => (
            <div
              key={film.maPhim}
              className="w-64 flex-shrink-0 rounded-lg bg-gray-800 text-white shadow-lg"
            >
              <div
                className="group relative h-64 cursor-pointer overflow-hidden"
                onClick={() => {
                  navigate(`/detail/${film.maPhim}`);
                }}
              >
                <img
                  src={film.hinhAnh}
                  alt={film.tenPhim}
                  className="w-full rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-125"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <img src="/play4.svg" alt="" className="h-12 w-12" />
                </div>
              </div>

              <div className="p-4">
                <h2
                  className="cursor-pointer truncate text-lg font-medium hover:text-orange-500"
                  onClick={() => {
                    navigate(`/detail/${film.maPhim}`);
                  }}
                >
                  {film.tenPhim}
                </h2>
                <div className="flex items-center justify-between">
                  <p>Đánh giá :</p>
                  <Rate disabled defaultValue={film.danhGia} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ListFilm.propTypes = {
  translate: PropTypes.number.isRequired,
};

export default ListFilm;
