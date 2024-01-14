import { Navigate, Outlet } from "react-router-dom"
import FullLoader from "../components/FullLoader"
import fetcher from "../utils/fetcher"
import useSWR from "swr"

export default function PrivateRoutes() {
  const { data, error, isLoading } = useSWR(`/auth/verify-token`, fetcher)

  if (isLoading) {
    return <FullLoader />
  }

  if (error) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}