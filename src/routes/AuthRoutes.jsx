import { Navigate, Outlet } from "react-router-dom"

export default function AuthRoutes() {
  const token = localStorage.getItem('accessToken');

  return token ? <Navigate to='/dashboard' /> : <Outlet />
}