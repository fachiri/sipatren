import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/index/Dashboard"
import Absensi from "./pages/dashboard/absensi/Absensi"
import Login from "./pages/auth/Login"
import PrivateRoutes from "./routes/PrivateRoutes"
import SantriIndex from "./pages/dashboard/master/santri/SantriIndex"
import SantriCreate from "./pages/dashboard/master/santri/SantriCreate"
import AuthRoutes from "./routes/AuthRoutes"
import SantriDetail from "./pages/dashboard/master/santri/SantriDetail"
import TeacherCreate from "./pages/dashboard/master/teacher/TeacherCreate"
import TeacherIndex from "./pages/dashboard/master/teacher/TeacherIndex"
import TeacherDetail from "./pages/dashboard/master/teacher/TeacherDetail"
import ClassIndex from "./pages/dashboard/master/class/ClassIndex"
import ClassCreate from "./pages/dashboard/master/class/ClassCreate"
import ClassDetail from "./pages/dashboard/master/class/ClassDetail"
import SubjectIndex from "./pages/dashboard/master/subject/SubjectIndex"
import SubjectCreate from "./pages/dashboard/master/subject/SubjectCreate"
import SubjectDetail from "./pages/dashboard/master/subject/SubjectDetail"

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
          <Route path="/dashboard/master">
            <Route path="santri" element={<SantriIndex />} />
            <Route path="santri/create" element={<SantriCreate />} />
            <Route path="santri/detail/:uuid" element={<SantriDetail />} />
            <Route path="teachers" element={<TeacherIndex />} />
            <Route path="teachers/create" element={<TeacherCreate />} />
            <Route path="teachers/detail/:uuid" element={<TeacherDetail />} />
            <Route path="classes" element={<ClassIndex />} />
            <Route path="classes/create" element={<ClassCreate />} />
            <Route path="classes/detail/:uuid" element={<ClassDetail />} />
            <Route path="subjects" element={<SubjectIndex />} />
            <Route path="subjects/create" element={<SubjectCreate />} />
            <Route path="subjects/detail/:uuid" element={<SubjectDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  )
}
