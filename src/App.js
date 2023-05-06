import "./styles.scss";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppointmentTable from "./AppointmentTable";
import Confirmation from "./Confirmation";
import Footer from "./footer";
import Header from "./header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Start from "./Start";
import Header2 from "./Header2";
import Appointment from "./Appointment";
import AppointmentBooking from "./AppointmentBooking";
// import { useState } from "react";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // const login = () => {
  //   setLoggedIn(true);
  // };

  // const logout = () => {
  //   setLoggedIn(false);
  // };

  return (
    <Router>
      {/* {loggedIn ? <Header2 /> : <Header />} */}
      <Header />
      <main className="govuk-width-container govuk-!-margin-top-7 govuk-!-margin-bottom-7">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="home" element={<Home />} />
          <Route path="booking" element={<AppointmentBooking />} />
          <Route
            path="patient-appointment-table"
            element={<AppointmentTable />}
          />
          <Route path="admin-appointment" element={<Appointment />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
