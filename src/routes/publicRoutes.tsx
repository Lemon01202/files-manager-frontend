import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from 'pages/auth/login'
import Callback from 'pages/auth/callback'

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<Callback />} />
    </Routes>
  )
}

export default PublicRoutes
