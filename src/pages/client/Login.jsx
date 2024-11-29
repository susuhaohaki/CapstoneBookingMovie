import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Vui lòng nhập tài khoản"),
      matKhau: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyNguoiDung/DangNhap`,
          values, // Đảm bảo dữ liệu truyền đi đúng
          {
            headers: {
              "Content-Type": "application/json",
              TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
            },
          },
        );
        toast.success("Đăng nhập thành công!");
        navigate("/");
        const accessToken = response.data.content.accessToken;
        localStorage.setItem("accessToken", accessToken); // Lưu token vào localStorage
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        toast.error(error.response.data.content);
      }
    },
  });
  return (
    <div className="flex min-h-screen justify-center bg-gray-900 px-4 pt-5">
      <div className="flex w-full max-w-7xl flex-col rounded-lg bg-gray-800 shadow-lg lg:flex-row">
        {/* Hình ảnh bên trái */}
        <div className="hidden w-full lg:block lg:w-1/2">
          <img
            src="https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2022/07/phase-4-vu-tru-mcu-qua-te-hai-thi-nguyen-nhan-la-do-avengers-endgame_62e1e0e9519a5.jpeg" // Thay bằng hình ảnh bạn muốn
            alt="Login Image"
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>

        {/* Form đăng nhập bên phải */}
        <div className="w-full px-6 py-8 lg:w-1/2">
          <h2 className="mb-6 text-center text-2xl font-bold text-orange-500">
            Đăng Nhập
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Tài khoản */}
            <div>
              <label
                htmlFor="taiKhoan"
                className="block text-sm font-medium text-gray-200"
              >
                Tài Khoản
              </label>
              <div className="relative my-1">
                <input
                  type="text"
                  id="taiKhoan"
                  name="taiKhoan"
                  className="w-full rounded-md border border-gray-600 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Nhập tài khoản"
                  value={formik.values.taiKhoan}
                  onChange={formik.handleChange}
                />
                <i className="fas fa-user absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"></i>
                {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                  <div className="absolute bottom--4 text-xs text-red-500">
                    {formik.errors.taiKhoan}
                  </div>
                )}
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="matKhau"
                className="block text-sm font-medium text-gray-200"
              >
                Mật Khẩu
              </label>
              <div className="relative my-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="matKhau"
                  name="matKhau"
                  className="w-full rounded-md border border-gray-600 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Nhập mật khẩu"
                  value={formik.values.matKhau}
                  onChange={formik.handleChange}
                />
                <i
                  onClick={togglePassword}
                  className={`fas fa-eye absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer ${
                    showPassword ? "text-orange-500" : "text-gray-400"
                  }`}
                ></i>
                {formik.touched.matKhau && formik.errors.matKhau && (
                  <div className="absolute bottom--4 text-xs text-red-500">
                    {formik.errors.matKhau}
                  </div>
                )}
              </div>
            </div>

            {/* Nút đăng nhập */}
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 px-4 py-3 text-white shadow-md transition duration-200 hover:bg-orange-600"
              >
                Đăng Nhập
              </button>
            </div>
          </form>

          {/* Đăng ký */}
          <p className="mt-4 text-center text-sm text-gray-200">
            Chưa có tài khoản?{" "}
            <NavLink to="/register" className="text-orange-500 hover:underline">
              Đăng ký ngay
            </NavLink>
          </p>

          {/* Đăng nhập bằng mạng xã hội */}
          <div className="mt-6">
            <p className="text-center text-sm text-gray-500">
              Hoặc đăng nhập bằng
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              {/* Google */}
              <div className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-blue-600 shadow-md transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg">
                <i className="fab fa-google transform text-xl transition-transform duration-300 group-hover:scale-110"></i>
              </div>
              {/* Facebook */}
              <div className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-blue-800 shadow-md transition duration-300 hover:bg-blue-800 hover:text-white hover:shadow-lg">
                <i className="fab fa-facebook-f transform text-xl transition-transform duration-300 group-hover:scale-110"></i>
              </div>
              {/* Twitter */}
              <div className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-blue-400 shadow-md transition duration-300 hover:bg-blue-400 hover:text-white hover:shadow-lg">
                <i className="fab fa-twitter transform text-xl transition-transform duration-300 group-hover:scale-110"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
