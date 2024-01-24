import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/index/Dashboard"
import Presensi from "./pages/dashboard/presensi/Presensi"
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
import ProfileIndex from "./pages/dashboard/profile/ProfileIndex"
import SchoolYear from "./pages/dashboard/master/schoolyear/SchoolYearIndex"
import SchoolYearCreate from "./pages/dashboard/master/schoolyear/SchoolYearCreate"
import SchoolYearDetail from "./pages/dashboard/master/schoolyear/SchoolYearDetail"
import ScheduleIndex from "./pages/dashboard/master/schedule/ScheduleIndex"
import SchduleCreate from "./pages/dashboard/master/schedule/ScheduleCreate"
import ScheduleDetail from "./pages/dashboard/master/schedule/ScheduleDetail"
import TandaiKehadiran from "./pages/dashboard/presensi/TandaiKehadiran"
import Histories from "./pages/dashboard/presensi/Histories"
import History from "./pages/dashboard/presensi/History"
import NotFound from "./pages/errors/NotFound"

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
          <Route path="/dashboard/presence" element={<Presensi />} />
          <Route path="/dashboard/presence/mark/:uuid" element={<TandaiKehadiran />} />
          <Route path="/dashboard/histories" element={<Histories />} />
          <Route path="/dashboard/histories/detail/:uuid" element={<History />} />
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
            <Route path="schoolyears" element={<SchoolYear />} />
            <Route path="schoolyears/create" element={<SchoolYearCreate />} />
            <Route path="schoolyears/detail/:uuid" element={<SchoolYearDetail />} />
            <Route path="schedules" element={<ScheduleIndex />} />
            <Route path="schedules/create" element={<SchduleCreate />} />
            <Route path="schedules/detail/:uuid" element={<ScheduleDetail />} />
          </Route>
          <Route path="/dashboard/profile" element={<ProfileIndex />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
