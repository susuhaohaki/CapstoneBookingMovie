import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-200">
      {/* Icon */}
      <div className="mb-6 text-6xl text-orange-500">
        <i className="fas fa-film"></i>
      </div>
      {/* Title */}
      <h1 className="mb-3 text-4xl font-extrabold text-orange-500">
        Oops! Trang Không Tồn Tại
      </h1>
      {/* Description */}
      <p className="mb-6 text-lg text-gray-400 text-center">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa. Hãy quay lại trang chủ để tiếp tục khám phá!
      </p>
      {/* Back to Home Button */}
      <NavLink
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold text-gray-900 shadow-lg transition duration-200 hover:bg-orange-600"
      >
        <i className="fas fa-arrow-left mr-2"></i> Về Trang Chủ
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
