import Logo from "/logo.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
const AdminTemplate = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobile = () => {
    setIsMobile(!isMobile);
  };
  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* NavBar */}
      <nav className="fixed z-30 w-full border-b border-gray-700 bg-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="cursor-pointer rounded p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:ring-2 focus:ring-gray-700 lg:hidden"
                onClick={toggleMobile}
              >
                <svg
                  id="toggleSidebarMobileHamburger"
                  className={isMobile ? "hidden" : "h-6 w-6"}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  id="toggleSidebarMobileClose"
                  className={isMobile ? "h-6 w-6" : "hidden"}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Link to="/" className="group ml-2 flex md:mr-24">
                <img
                  src={Logo}
                  className="mr-3 h-10 group-hover:saturate-200"
                  alt="booking-ticket-logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-orange-500 group-hover:saturate-200 sm:text-2xl">
                  Booking Ticket
                </span>
              </Link>
              <form
                action="#"
                method="GET"
                className="hidden lg:block lg:pl-3.5"
              >
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-96">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-4 w-4 text-gray-400"
                      fill="currentColor"
                    >
                      <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline focus:outline-0 focus:ring-blue-500 contrast-more:border-gray-400 contrast-more:placeholder-gray-500 sm:text-sm"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex rounded-full bg-orange-300 text-sm focus:ring-4 focus:ring-gray-600"
                id="user-button"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://robohash.org/avatar"
                  alt="user photo"
                />
              </button>
              <Link
                to="/"
                className="ml-3 flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                  />
                </svg>
                Log out
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex overflow-hidden bg-gray-900 pt-16">
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={
            isMobile
              ? "transition-width fixed left-0 top-0 z-20 flex h-full w-64 flex-shrink-0 flex-col pt-16 font-normal duration-75 lg:flex"
              : "transition-width fixed left-0 top-0 z-20 hidden h-full w-64 flex-shrink-0 flex-col pt-16 font-normal duration-75 lg:flex"
          }
          aria-label="Sidebar"
        >
          <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-700 bg-gray-800 pt-0">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
              <div className="flex-1 space-y-1 divide-y divide-gray-700 bg-gray-800 px-3">
                <ul className="space-y-2 pb-2">
                  <li>
                    <form action="#" method="GET" className="lg:hidden">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                        </div>
                        <input
                          type="text"
                          name="mobile-search"
                          id="mobile-search"
                          className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 text-sm text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:outline focus:outline-0 focus:ring-blue-500 contrast-more:border-gray-400 contrast-more:placeholder-gray-500"
                          placeholder="Search"
                        />
                      </div>
                    </form>
                  </li>
                  {/* Dashboard */}
                  <li>
                    <NavLink
                      to="./dashboard"
                      className="group flex items-center rounded-lg p-2 text-base text-gray-200 hover:bg-gray-700"
                    >
                      <svg
                        className="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-white"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                      </svg>
                      <span className="ml-3">Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="./users"
                      className="group flex items-center rounded-lg p-2 text-base text-gray-200 hover:bg-gray-700"
                    >
                      <svg
                        className="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-white"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                      </svg>

                      <span className="ml-3">Users</span>
                    </NavLink>
                  </li>
                  {/* Films */}
                  <li>
                    <button
                      type="button"
                      className="group flex w-full items-center rounded-lg p-2 text-base text-gray-200 transition duration-75 hover:bg-gray-700"
                      onClick={toggleSubmenu}
                    >
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-gray-400 transition duration-75 group-hover:text-white"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM160 128l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L192 96c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0z" />
                      </svg>
                      <span className="ml-3 flex-1 whitespace-nowrap text-left">
                        Films
                      </span>
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fillRule="evenodd"
                          d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <ul
                      id="dropdown-films"
                      className={isOpen ? "space-y-2 p-2" : "hidden"}
                    >
                      <li>
                        <NavLink
                          to="./films/"
                          className="group flex items-center rounded-lg p-2 pl-11 text-base text-gray-200 transition duration-75 hover:bg-gray-700"
                        >
                          Films
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="./films/addnew"
                          className="group flex items-center rounded-lg p-2 pl-11 text-base text-gray-200 transition duration-75 hover:bg-gray-700"
                        >
                          Add new
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <NavLink
                      to="./showtime"
                      className="group flex items-center rounded-lg p-2 text-base text-gray-200 hover:bg-gray-700"
                    >
                      <svg
                        className="h-6 w-6 text-gray-400 transition duration-75 group-hover:text-white"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z" />
                      </svg>
                      <span className="ml-3">Showtime</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            {/* Back */}
            <div className="absolute bottom-0 left-0 hidden w-full justify-center space-x-4 bg-gray-800 p-4 lg:flex">
              <Link
                to="/"
                className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-700 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </Link>
            </div>
          </div>
        </aside>
        {/* Sidebar Content */}
        <div className="relative h-full w-full overflow-y-auto bg-gray-900 lg:ml-64">
          <main>
            <div className="px-4 pt-6">
              <div className="grid h-screen">
                <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminTemplate;
