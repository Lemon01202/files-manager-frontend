import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from 'components/context/authContext'
import Loader from "components/loader/loader";

const PrivateRoutes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext) || {}
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [isAuthenticated])

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default PrivateRoutes
