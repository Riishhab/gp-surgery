import "./App.css";
import "./styles.scss";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import AppointmentTable from "./AppointmentTable";
import Confirmation from "./Confirmation";
import Footer from "./footer";
import Header from "./header";
import Login from "./Login";
import Signup from "./Signup";
import Start from "./Start";

function App() {
  return (
    <Router>
      <Header />
      <main className="govuk-width-container govuk-!-margin-top-7 govuk-!-margin-bottom-7">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="confirmation" element={<Confirmation />} />
          {/* <CookieBanner /> */}
          {/* <WarningText /> */}
          {/* <AppointmentTable /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
