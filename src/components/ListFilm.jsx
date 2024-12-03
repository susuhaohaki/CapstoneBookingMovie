import { useState } from "react";
import { useSelector } from "react-redux";
import { Rate } from 'antd';

const ListFilm = (props) => {
  const { filteredFilms } = useSelector((state) => state.quanLyPhimReducer);
  const{translate} = props
  return (
    <div className="py-4 relative">
      
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
              <img
                src={film.hinhAnh}
                alt={film.tenPhim}
                className="h-64 w-full rounded-t-lg object-cover"
              />
              <div className="p-4">
                <h2 className="truncate text-lg font-medium">{film.tenPhim}</h2>
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
