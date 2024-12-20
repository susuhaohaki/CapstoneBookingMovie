import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "../services/authService";
import { useEffect } from "react";
import { logout, setCredentials } from "../store/reducers/authReducer";
const Navbar = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetProfileQuery("userProfile", {
    pollingInterval: 900000,
  });
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);
  return (
    <nav className="bg-gray-900 text-gray-200 shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex h-16 items-center space-x-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <p className="text-xl font-bold text-orange-500 md:hidden lg:inline-block">
            BOOKING TICKET
          </p>
        </NavLink>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-500 hover:text-orange-500"
                : "hover:text-orange-500"
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/movie"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-500 hover:text-orange-500"
                : "hover:text-orange-500"
            }
          >
            Phim Đang Chiếu
          </NavLink>
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-orange-500 hover:text-orange-500"
                : "hover:text-orange-500"
            }
          >
            Phim Sắp Chiếu
          </NavLink>
        </div>

        {/* Sign In/Sign Up */}

        <div className="hidden md:flex md:items-center md:gap-5">
          {isFetching ? (
            <span className="text-lg text-gray-400">Loading...</span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <NavLink
                to="/profile"
                className="text-lg font-semibold text-orange-500 hover:text-orange-300"
              >
                Xin chào, {user?.taiKhoan}
              </NavLink>
              <button
                className="text-gray-500 hover:text-orange-600"
                onClick={() => dispatch(logout())}
                title="Đăng xuất"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/register"
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Đăng Ký
              </NavLink>
              <NavLink
                to="/login"
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Đăng Nhập
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-2xl text-gray-200 md:hidden"
          onClick={toggleMenu}
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-gray-800 text-gray-200 lg:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block rounded bg-orange-600 px-4 py-2 font-semibold text-white shadow"
                : "block px-4 py-2 text-gray-300 hover:text-orange-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movie"
            className={({ isActive }) =>
              isActive
                ? "block rounded bg-orange-600 px-4 py-2 font-semibold text-white shadow"
                : "block px-4 py-2 text-gray-300 hover:text-orange-400"
            }
          >
            Showing Movie
          </NavLink>
          <NavLink
            to="/comming"
            className={({ isActive }) =>
              isActive
                ? "block rounded bg-orange-600 px-4 py-2 font-semibold text-white shadow"
                : "block px-4 py-2 text-gray-300 hover:text-orange-400"
            }
          >
            Coming Movie
          </NavLink>
          <div className="flex items-center justify-center gap-3 px-4 py-2">
            {isFetching ? (
              <span className="text-lg text-gray-400">Loading...</span>
            ) : user ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/profile"
                  className="text-lg font-semibold text-orange-500 hover:text-orange-300"
                >
                  Xin chào, {user?.taiKhoan}
                </NavLink>
                <button
                  className="text-gray-500 hover:text-orange-600"
                  onClick={() => dispatch(logout())}
                  title="Đăng xuất"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="rounded border border-orange-500 px-4 py-2 text-center text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Đăng Ký
                </NavLink>
                <NavLink
                  to="/login"
                  className="rounded bg-orange-500 px-4 py-2 text-center text-white hover:bg-orange-600"
                >
                  Đăng Nhập
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
