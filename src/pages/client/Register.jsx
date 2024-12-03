import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .required("Tài khoản là bắt buộc")
        .min(5, "Tài khoản phải có ít nhất 5 ký tự"),
      matKhau: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất một ký tự thường")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một ký tự in hoa")
        .matches(/\d/, "Mật khẩu phải có ít nhất một chữ số")
        .matches(/[@$!%*?&#]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt"),
      email: Yup.string()
        .required("Email là bắt buộc")
        .email("Email không hợp lệ"),
      soDt: Yup.string()
        .required("Số điện thoại là bắt buộc")
        .matches(
          /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
          "Số điện thoại không hợp lệ.",
        ),
      hoTen: Yup.string()
        .required("Họ tên là bắt buộc")
        .min(8, "Họ tên phải có ít nhất 8 ký tự"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyNguoiDung/DangKy`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
            },
          },
        );
        if (res.status === 200) {
          toast.success("Đăng ký thành công!");
          navigate("/login");
        }
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        toast.error(error.response.data.content);
      }s
    },
  });

  return (
    <div className="flex h-full items-start justify-center bg-gray-900 px-4 py-12">
      <div className="container flex w-full flex-col rounded-lg bg-gray-800 shadow-lg md:flex-row">
        {/* Hình ảnh bên trái */}
        <div className="hidden w-full lg:block lg:w-1/2">
          <img
            src="https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2022/07/phase-4-vu-tru-mcu-qua-te-hai-thi-nguyen-nhan-la-do-avengers-endgame_62e1e0e9519a5.jpeg"
            alt="Register Image"
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>

        {/* Form đăng ký bên phải */}
        <div className="w-full px-4 py-6 md:px-6 md:py-8 lg:w-1/2">
          <h2 className="mb-6 text-center text-xl font-bold text-orange-500 md:text-2xl">
            Đăng Ký Tài Khoản
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5"
          >
            {/* Tài khoản */}
            <div className="col-span-1">
              <label
                htmlFor="taiKhoan"
                className="block text-sm font-medium text-gray-200"
              >
                Tài Khoản
              </label>
              <div className="relative mt-1">
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
                  <p className="absolute bottom--4 text-xs text-red-500">
                    {formik.errors.taiKhoan}
                  </p>
                )}
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="col-span-1">
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

            {/* Email */}
            <div className="col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-600 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Nhập email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"></i>
                {formik.touched.email && formik.errors.email && (
                  <p className="absolute bottom--2 text-xs text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="col-span-1">
              <label
                htmlFor="soDt"
                className="block text-sm font-medium text-gray-200"
              >
                Số Điện Thoại
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="soDt"
                  name="soDt"
                  className="w-full rounded-md border border-gray-600 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Nhập số điện thoại"
                  value={formik.values.soDt}
                  onChange={formik.handleChange}
                />
                <i className="fas fa-phone-alt absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"></i>
                {formik.touched.soDt && formik.errors.soDt && (
                  <p className="absolute bottom--2 text-xs text-red-500">
                    {formik.errors.soDt}
                  </p>
                )}
              </div>
            </div>

            {/* Họ tên */}
            <div className="col-span-1 lg:col-span-2">
              <label
                htmlFor="hoTen"
                className="block text-sm font-medium text-gray-200"
              >
                Họ Tên
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="hoTen"
                  name="hoTen"
                  className="w-full rounded-md border border-gray-600 p-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Nhập họ tên"
                  value={formik.values.hoTen}
                  onChange={formik.handleChange}
                />
                <i className="fas fa-user-tag absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"></i>
                {formik.touched.hoTen && formik.errors.hoTen && (
                  <p className="absolute bottom--2 text-xs text-red-500">
                    {formik.errors.hoTen}
                  </p>
                )}
              </div>
            </div>

            {/* Nút đăng ký */}
            <div className="col-span-1 lg:col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 px-4 py-3 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-orange-600 md:text-base"
              >
                Đăng Ký
              </button>
            </div>
          </form>

          {/* Đăng nhập */}
          <p className="mt-4 text-center text-sm text-gray-200">
            Đã có tài khoản?{" "}
            <NavLink to="/login" className="text-orange-500 hover:underline">
              Đăng nhập ngay
            </NavLink>
          </p>

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

export default Register;
