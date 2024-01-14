import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/index/Dashboard"
import Absensi from "./pages/dashboard/absensi/Absensi"
import Login from "./pages/auth/Login"
import PrivateRoutes from "./routes/PrivateRoutes"
import SantriIndex from "./pages/dashboard/master/santri/SantriIndex"
import SantriCreate from "./pages/dashboard/master/santri/SantriCreate"
import AuthRoutes from "./routes/AuthRoutes"
import SantriDetail from "./pages/dashboard/master/santri/SantriDetail"
import ClassCreate from "./pages/dashboard/master/class/ClassCreate"
import TeacherCreate from "./pages/dashboard/master/teacher/TeacherCreate"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/absensi" element={<Absensi />} />
          <Route path="/dashboard/master/santri" element={<SantriIndex />} />
          <Route path="/dashboard/master/santri/create" element={<SantriCreate />} />
          <Route path="/dashboard/master/santri/detail/:uuid" element={<SantriDetail />} />
          <Route path="/dashboard/master/teachers/create" element={<TeacherCreate />} />
          <Route path="/dashboard/master/classes/create" element={<ClassCreate />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  )
}
