import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import MovieDetailPage from "./pages/client/MovieDetailPage";
import BookTicketPage from "./pages/client/BookTicketPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/detail/:id" element={<MovieDetailPage />} />
        <Route path="/ticketroom/:id" element={<BookTicketPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
