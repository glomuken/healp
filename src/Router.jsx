  import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

  // Practitioner pages
  import PractitionerLogin from './pages/practitioner/Login'
  import PractitionerSignup from './pages/practitioner/Signup'
  import PractitionerDashboardLayout from './pages/practitioner/DashboardLayout'
  import PatientsPage from './pages/practitioner/PatientPage'
  import RemindersPage from './pages/practitioner/RemindersPage'
  import WorldHealthPage from './pages/practitioner/WorldHealthPage'
  import PractitionerProfilePage from './pages/practitioner/PracctitionerProfilePage'

  // User pages
  import UserLogin from './pages/user/Login'
  import UserSignup from './pages/user/Signup'
  import UserDashboardLayout from './pages/user/UserDashboardLayout'
  import MedTracker from './pages/user/MedTracker'
  import BookAppointment from './pages/user/BookAppointment'
  import PatientHistoryPage from './pages/user/PatientHistoryPage'

  import Chat from './pages/user/chat'


  // PrivateRoute component for practitioner auth guard
  function PractitionerPrivateRoute() {
    const loggedInPractitioner = JSON.parse(localStorage.getItem('loggedInPractitioner'))
    return loggedInPractitioner ? <Outlet /> : <Navigate to="/practitioner/login" replace />
  }

  function UserPrivateRoute() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    return loggedInUser ? <Outlet /> : <Navigate to="/user/login" replace />
  }

  function Router() {
    return (
      <Routes>
        {/* Home redirects to practitioner login */}
        <Route path="/" element={<Navigate to="/practitioner/login" />} />



        {/* Practitioner routes */}
        <Route path="/practitioner/login" element={<PractitionerLogin />} />
        <Route path="/practitioner/signup" element={<PractitionerSignup />} />

        {/* Protected practitioner dashboard route */}
        <Route element={<PractitionerPrivateRoute />}>
          <Route path="/practitioner/dashboard" element={<PractitionerDashboardLayout />} />
          <Route path="/practitioner/patients" element={<PatientsPage />} />
          <Route path="/practitioner/reminders" element={<RemindersPage />} />
          <Route path="/practitioner/announcements" element={<WorldHealthPage />} />
          <Route path="/practitioner/profile" element={<PractitionerProfilePage />} />
        </Route>

        {/* User routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />

        {/* Protected user dashboard route */}
        <Route element={<UserPrivateRoute />}>
          <Route path="/user/dashboard" element={<UserDashboardLayout />} />
          <Route path="/user/medtracker" element={<MedTracker />} />
          <Route path='/user/bookappointment' element={<BookAppointment />} />
          <Route path="/user/chat" element={<Chat />} />
          <Route path='user/patientrecords' element={<PatientHistoryPage />} />
        </Route>
      </Routes>
    )
  }

  export default Router
//     <div className="main-content-header">