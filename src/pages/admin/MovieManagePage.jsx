import axios from "axios";
import { useEffect, useState } from "react";

const MovieManagePage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFilms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MOVIE_URL}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
        {
          headers: {
            "Content-Type": "application/json",
            TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
          },
        },
      );
      const data = await response.data.content;
      setFilms(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div className="mx-auto">
      <div className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold leading-6 text-orange-500">
                Film Management
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                A list of all the films and add new film
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Add film
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="py-4 text-center text-white">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      films?.map((film) => (
                        <tr key={film.maPhim}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {film.maPhim}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            <img
                              src={film.hinhAnh}
                              alt={film.tenPhim}
                              className="h-20 w-20 rounded object-cover"
                            />
                          </td>
                          <td className="max-w-xs px-3 py-4 text-sm text-gray-300">
                            {film.tenPhim}
                          </td>
                          <td className="max-w-xs px-3 py-4 text-sm text-gray-300">
                            <p className="truncate" title={film.moTa}>
                              {film.moTa}
                            </p>
                          </td>
                          <td className="relative space-x-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a
                              href="#"
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              Edit
                              <span className="sr-only">, {film.tenPhim}</span>
                            </a>
                            <a
                              href="#"
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
                              <span className="sr-only">, {film.tenPhim}</span>
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieManagePage;
