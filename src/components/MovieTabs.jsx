import ListFilm from "./ListFilm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilmAPI, setFilteredFilmsAction } from "../store/reducers/QuanLyPhimReducer";

const MovieTabs = () => {
  const filmCategories = ["Hot", "Đang chiếu", "Sắp chiếu"];
  const [activeCategory, setActiveCategory] = useState(0);
  const { arrayFilm, filteredFilms } = useSelector((state) => state.quanLyPhimReducer);
  const dispatch = useDispatch();
  const [translate, setTranslate] = useState(0);

  const handlePrev = () => {
    // Giảm giá trị translate khi nhấn prev
    setTranslate((prev) => Math.min(prev + 256, 0));
  };

  const handleNext = () => {
    // Tăng giá trị translate khi nhấn next
    const maxTranslate = -((filteredFilms?.length || 0) * 256 - window.innerWidth); // Tính giá trị trượt tối đa
    setTranslate((prev) => Math.max(prev - 256, maxTranslate));
  };

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

  useEffect(() => {
    dispatch(getAllFilmAPI());
  }, []);

  useEffect(() => {
    if (arrayFilm.length > 0) {
      filterFilms();
    }
  }, [activeCategory, arrayFilm]);

  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex md:grid md:grid-cols-12 gap-4 mb-6 relative">
        <div className="absolute hidden md:flex right-0 bottom-0 items-center gap-4">
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
              className={`gird col-span-2 w-full text-center py-2 text-sm md:text-base font-medium rounded-md border transition-all ${
                activeCategory === index
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border-gray-600"
              }`}
              onClick={() => setActiveCategory(index)}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Film List */}
        <ListFilm translate={translate}/>
      </div>
    </div>
  );
};

export default MovieTabs;
