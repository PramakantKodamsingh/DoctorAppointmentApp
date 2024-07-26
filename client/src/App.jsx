import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import RouteProtected from "./components/RouteProtected";
import RoutePublic from "./components/RoutePublic";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import UserProfile from "./pages/user/userProfile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import AdminProfile from "./pages/admin/adminProfile";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <RoutePublic>
                  <Login />
                </RoutePublic>
              }
            />

            <Route
              path="/register"
              element={
                <RoutePublic>
                  <Register />
                </RoutePublic>
              }
            />
            <Route
              path="/"
              element={
                <RouteProtected>
                  <HomePage />
                </RouteProtected>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <RouteProtected>
                  <ApplyDoctor />
                </RouteProtected>
              }
            />

            <Route
              path="/notification"
              element={
                <RouteProtected>
                  <NotificationPage />
                </RouteProtected>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <RouteProtected>
                  <Doctors />
                </RouteProtected>
              }
            />

            <Route
              path="/admin/users"
              element={
                <RouteProtected>
                  <Users />
                </RouteProtected>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <RouteProtected>
                  <Profile />
                </RouteProtected>
              }
            />
            <Route
              path="/user/profile/:id"
              element={
                <RouteProtected>
                  <UserProfile />
                </RouteProtected>
              }
            />
            <Route
              path="/admin/profile/:id"
              element={
                <RouteProtected>
                  <AdminProfile />
                </RouteProtected>
              }
            />

            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <RouteProtected>
                  <BookingPage />
                </RouteProtected>
              }
            />
            <Route
              path="/appointments"
              element={
                <RouteProtected>
                  <Appointments />
                </RouteProtected>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <RouteProtected>
                  <DoctorAppointments />
                </RouteProtected>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
