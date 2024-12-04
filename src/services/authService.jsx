import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_MOVIE_URL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const userToken = getState().authReducer.token;
      if (userToken) {
        headers.set("TokenCybersoft", import.meta.env.VITE_TOKEN_CYBERSOFT);
        headers.set("Authorization", "Bearer " + userToken);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = authApi;
export default authApi;
