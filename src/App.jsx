import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
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
import NotFoundPage from "./pages/client/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route index element={<HomePage />} />
            <Route path="detail/:id" element={<MovieDetailPage />} />
            <Route path="ticketroom/:id" element={<BookTicketPage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<AdminTemplate />}>
            <Route index element={<UserManagePage />} />
            <Route path="dashboard" element={<UserManagePage />} />
            <Route path="users" element={<UserManagePage />} />
            <Route path="films" element={<MovieManagePage />} />
            <Route path="films/addnew" element={<AddMoviePage />} />
            <Route path="films/edit/:id" element={<EditMoviePage />} />
            <Route path="films/showtime/:id" element={<ShowtimePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer autoClose={1500} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
