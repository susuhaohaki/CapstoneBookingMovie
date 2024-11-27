import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import MovieDetailPage from "./pages/client/MovieDetailPage";
import BookTicketPage from "./pages/client/BookTicketPage";
import HomeTemplate from "./templates/HomeTemplate";
import Register from "./pages/client/Register";
import Login from "./pages/client/Login";
import Profile from "./pages/client/Profile";
import UserManagePage from "./pages/admin/UserManagePage";
import MovieManagePage from "./pages/admin/MovieManagePage";
import ShowtimePage from "./pages/admin/ShowtimePage";
import AddMoviePage from "./pages/admin/AddMoviePage";
import EditMoviePage from "./pages/admin/EditMoviePage";
import AdminTemplate from "./templates/AdminTemplate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="detail" element={<MovieDetailPage />}>
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>
          <Route path="ticketroom" element={<BookTicketPage />}>
            <Route path=":id" element={<BookTicketPage />} />
          </Route>
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />

        <Route path="admin" element={<AdminTemplate />}>
          <Route index element={<UserManagePage />} />
          <Route path="users" element={<UserManagePage />} />
          <Route path="films" element={<MovieManagePage />}>
            <Route path="addnew" element={<AddMoviePage />} />
            <Route path="edit" element={<EditMoviePage />}>
              <Route path=":id" element={<EditMoviePage />} />
            </Route>
            <Route path="showtime" element={<ShowtimePage />}>
              <Route path=":id" element={<ShowtimePage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/admin/films" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
