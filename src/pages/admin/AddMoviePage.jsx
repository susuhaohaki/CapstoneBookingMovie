const AddMoviePage = () => {
  return (
    <form>
      <div className="border-b border-white/10 pb-12">
        <h2 className="text-xl font-bold text-white">Add new film</h2>

        <div className="mt-10">
          <div className="mx-auto grid max-w-5xl grid-cols-[150px_1fr] items-start gap-x-4 gap-y-6">
            <label
              htmlFor="filmname"
              className="block text-sm font-medium leading-6 text-white"
            >
              Film name:
            </label>
            <input
              id="filmname"
              name="filmname"
              type="text"
              className="block w-full rounded-md border-0 bg-gray-700 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
            <label
              htmlFor="trailer"
              className="block text-sm font-medium leading-6 text-white"
            >
              Trailer:
            </label>
            <input
              id="trailer"
              name="trailer"
              type="text"
              className="block w-full rounded-md border-0 bg-gray-700 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-white"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="block w-full rounded-md border-0 bg-gray-700 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium leading-6 text-white"
            >
              Release date:
            </label>
            <input
              id="releaseDate"
              name="releaseDate"
              type="date"
              className="block w-1/5 rounded-md border-0 bg-gray-700 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />
            {/* Toggle */}
            <span className="block text-sm font-medium leading-6 text-white">
              Now showing:
            </span>
            <label
              htmlFor="nowshowing"
              className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
            >
              <input
                type="checkbox"
                id="nowshowing"
                className="peer sr-only"
                defaultChecked={false}
              />
              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
            </label>
            <span className="block text-sm font-medium leading-6 text-white">
              Up coming:
            </span>
            <label
              htmlFor="upcoming"
              className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
            >
              <input
                type="checkbox"
                id="upcoming"
                className="peer sr-only"
                defaultChecked={false}
              />
              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
            </label>
            <span className="block text-sm font-medium leading-6 text-white">
              Hot:
            </span>
            <label
              htmlFor="hot"
              className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
            >
              <input
                type="checkbox"
                id="hot"
                className="peer sr-only"
                defaultChecked={false}
              />
              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
            </label>

            <label
              htmlFor="rating"
              className="block text-sm font-medium leading-6 text-white"
            >
              Rating:
            </label>
            <input
              id="rating"
              name="rating"
              type="text"
              className="block w-1/5 rounded-md border-0 bg-gray-700 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            />

            <span className="block text-sm font-medium leading-6 text-white">
              Image:
            </span>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-2 flex items-center text-sm leading-6 text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-gray-700 px-2.5 py-1.5 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-orange-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold text-white hover:text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddMoviePage;
