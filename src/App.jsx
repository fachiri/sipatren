import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/index/Dashboard"
import Absensi from "./pages/dashboard/absensi/Absensi"
import Login from "./pages/auth/Login"
import PrivateRoutes from "./routes/PrivateRoutes"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/dashboard/absensi" element={<Absensi />} />
        </Route>
      </Routes>
    </>
  )
}
