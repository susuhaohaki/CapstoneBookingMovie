import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/client/HomePage';
import MovieDetailPage from './pages/client/MovieDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="" element={<HomePage />}/>
      <Route path='/detail/:id' element={<MovieDetailPage/>}/>
      <Route />

      </Routes>
    </BrowserRouter>
  )
}

export default App
