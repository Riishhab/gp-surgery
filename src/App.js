// Author: Rishab

import "./styles.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Start from "./Start";
import Login from "./Login";
import Signup from "./Signup";
import Confirmation from "./Confirmation";
import Home from "./Home";
import AppointmentBooking from "./AppointmentBooking";
import MedicalRecords from "./MedicalRecords";
import ManageSurgery from "./ManageSurgery";
import HeaderPublic from "./HeaderPublic";
import HeaderPatient from "./HeaderPatient";
import HeaderDoctor from "./HeaderDoctor";
import HeaderAdmin from "./HeaderAdmin";
import ProfilePatient from "./ProfilePatient";
import ProfileDoctor from "./ProfileDoctor";
import ProfileAdmin from "./ProfileAdmin";
import AppointmentPatient from "./AppointmentPatient";
import AppointmentDoctor from "./AppointmentDoctor";
import AppointmentAdmin from "./AppointmentAdmin";
import Footer from "./footer";

function App() {
  const { isLoggedIn, userType } = useContext(UserContext);

  return (
    <Router>
      {!isLoggedIn ? (
        <HeaderPublic />
      ) : userType === "Patient" ? (
        <HeaderPatient />
      ) : userType === "Doctor" ? (
        <HeaderDoctor />
      ) : userType === "Admin" ? (
        <HeaderAdmin />
      ) : (
        <HeaderPublic />
      )}
      <main className="govuk-width-container govuk-!-margin-top-7 govuk-!-margin-bottom-7">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="confirmation" element={<Confirmation />} />
          {isLoggedIn && userType === "Patient" && (
            <>
              <Route path="home" element={<Home />} />
              <Route path="manage-surgery" element={<ManageSurgery />} />
              <Route
                path="patient-appointment"
                element={<AppointmentPatient />}
              />
              <Route path="booking" element={<AppointmentBooking />} />
              <Route path="patient-profile" element={<ProfilePatient />} />
              <Route
                path="patient-medical-records"
                element={<MedicalRecords />}
              />
            </>
          )}
          {isLoggedIn && userType === "Doctor" && (
            <>
              <Route path="home" element={<Home />} />
              <Route
                path="doctor-appointment"
                element={<AppointmentDoctor />}
              />
              <Route path="doctor-profile" element={<ProfileDoctor />} />
            </>
          )}
          {isLoggedIn && userType === "Admin" && (
            <>
              <Route path="home" element={<Home />} />
              <Route path="admin-appointment" element={<AppointmentAdmin />} />
              <Route path="admin-profile" element={<ProfileAdmin />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/home" : "/"} />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
