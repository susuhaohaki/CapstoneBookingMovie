import { useState } from "react";
import { useSelector } from "react-redux";
import { Rate } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

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
              <div className="group relative h-64 overflow-hidden cursor-pointer" onClick={() => {
                navigate(`/detail/${film.maPhim}`);
              }}>
                <img
                  src={film.hinhAnh}
                  alt={film.tenPhim}
                  className="w-full rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-125 "
                />
                <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <img src="/play4.svg" alt=""  className="w-12 h-12"/>
                </div>
              </div>

              <div className="p-4">
                <h2 className="truncate text-lg font-medium cursor-pointer hover:text-orange-500" onClick={() => {
                navigate(`/detail/${film.maPhim}`)}}>{film.tenPhim}</h2>
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

export default ListFilm;
