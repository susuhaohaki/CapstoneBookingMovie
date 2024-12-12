import ListFilm from "./ListFilm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFilmAPI,
  setFilteredFilmsAction,
} from "../store/reducers/QuanLyPhimReducer";

const MovieTabs = () => {
  const filmCategories = ["Hot", "Đang chiếu", "Sắp chiếu"];
  const [activeCategory, setActiveCategory] = useState(0);
  const { arrayFilm, filteredFilms } = useSelector(
    (state) => state.quanLyPhimReducer,
  );
  const dispatch = useDispatch();
  const [translate, setTranslate] = useState(0);

  const handlePrev = () => {
    // Giảm giá trị translate khi nhấn prev
    setTranslate((prev) => Math.min(prev + 256, 0));
  };

  const handleNext = () => {
    // Tăng giá trị translate khi nhấn next
    const maxTranslate = -(
      (filteredFilms?.length || 0) * 256 -
      window.innerWidth
    ); // Tính giá trị trượt tối đa
    setTranslate((prev) => Math.max(prev - 256, maxTranslate));
  };

  useEffect(() => {
    dispatch(getAllFilmAPI());
  }, [dispatch]);

  useEffect(() => {
    const filterFilms = () => {
      const filteredList = arrayFilm.filter((film) => {
        if (activeCategory === 0) {
          return film.hot === true;
        } else if (activeCategory === 1) {
          return film.dangChieu === true;
        } else {
          return film.sapChieu === true;
        }
      });
      dispatch(setFilteredFilmsAction(filteredList));
    };
    if (arrayFilm.length > 0) {
      filterFilms();
    }
  }, [activeCategory, arrayFilm, dispatch]);

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Tabs */}
      <div className="relative mb-6 flex gap-4 md:grid md:grid-cols-12">
        <div className="absolute bottom-0 right-0 hidden items-center gap-4 md:flex">
          <div
            className="cursor-pointer rounded-full border border-white px-2 py-1 text-white hover:bg-orange-500"
            onClick={handlePrev}
          >
            <i className="fa-solid fa-arrow-left" />
          </div>
          <div
            className="cursor-pointer rounded-full border border-white px-2 py-1 text-white hover:bg-orange-500"
            onClick={handleNext}
          >
            <i className="fa-solid fa-arrow-right" />
          </div>
        </div>
        {filmCategories.map((label, index) => (
          <button
            key={index}
            className={`gird col-span-2 w-full rounded-md border py-2 text-center text-sm font-medium transition-all md:text-base ${
              activeCategory === index
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveCategory(index)}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Film List */}
      <ListFilm translate={translate} />
    </div>
  );
};

export default MovieTabs;
