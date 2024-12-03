import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-gray-200">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {/* Logo và giới thiệu */}
        <div>
          <img
            src="/logo.png"
            alt="Logo"
            className="mb-4 h-12 w-12 object-contain"
          />
          <p className="text-sm">
            Chào mừng bạn đến với BOOKING TICKET. Chúng tôi mang đến những trải
            nghiệm xem phim tuyệt vời nhất.
          </p>
        </div>

        {/* Navbar */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-orange-500">Menu</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-orange-500">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/movie" className="hover:text-orange-500">
                Phim Đang Chiếu
              </NavLink>
            </li>
            <li>
              <NavLink to="/upcoming" className="hover:text-orange-500">
                Phim Sắp Chiếu
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Kết nối với chúng tôi */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-orange-500">
            Kết nối với chúng tôi
          </h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="YouTube" className="text-red-500">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" aria-label="Instagram" className="text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Zalo" className="text-blue-400">
              <i className="fas fa-comment-dots"></i>
            </a>
          </div>
        </div>

        {/* Get in touch */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-orange-500">Liên hệ</h3>
          <p>+84 000-000-0000</p>
          <p className="truncate">nguyenhai250203@gmail.com</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
        © 2024 BOOKING TICKET. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
