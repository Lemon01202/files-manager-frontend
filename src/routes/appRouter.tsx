import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoutes from 'routes/privateRoutes'
import Login from "pages/auth/login"
import Callback from "pages/auth/callback"
import NotFound from "pages/notFound/notFound";
import MainPage from "pages/mainPage/mainPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<Callback />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />} />

          <Route path="/*" element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
