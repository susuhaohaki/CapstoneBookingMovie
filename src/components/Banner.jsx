import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "antd";
const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyPhim/LayDanhSachBanner`,
          {
            headers: {
              "Content-Type": "application/json",
              TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
            },
          },
        );
        const { content } = response.data;
        setBanners(content);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    getBanners();
  }, []);

  return (
    <Carousel autoplay arrows draggable infinite={false}>
      <div className="relative h-[500px] w-full md:h-[600px] lg:h-[700px]">
        <img
          src="https://genk.mediacdn.vn/2019/5/24/avengers-endgame-iron-man-tony-stark-inifinity-stones-uhdpapercom-8k-165-1558684118519907299818.jpg"
          alt="Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-orange-500 md:text-5xl lg:text-6xl">
            Welcome to Our Movie Platform
          </h1>
          <p className="mb-6 max-w-2xl text-sm text-gray-200 md:text-lg lg:text-xl">
            Discover the latest movies, watch trailers, and book your tickets
            effortlessly.
          </p>
          <button className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 md:text-lg">
            Explore Now
          </button>
        </div>
      </div>
      {banners.map(({ hinhAnh }, index) => (
        <div
          key={index}
          className="relative h-[500px] w-full md:h-[600px] lg:h-[700px]"
        >
          <img
            src={hinhAnh}
            alt={`Banner-${index}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold text-orange-500 md:text-5xl lg:text-6xl">
              Welcome to Our Movie Platform
            </h1>
            <p className="mb-6 max-w-2xl text-sm text-gray-200 md:text-lg lg:text-xl">
              Discover the latest movies, watch trailers, and book your tickets
              effortlessly.
            </p>
            <button className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 md:text-lg">
              Explore Now
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
