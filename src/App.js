import './App.css';
import './styles.scss';
import Header from './header';
import Back from './Back';
import Footer from './footer';
import AppointmentTable from './AppointmentTable';
import WarningText from './warningtext';
import CookieBanner from './cookiebanner';

function App() {
  return (
    <div className="App">
      <Header />
      <CookieBanner />
      <Back />
      <WarningText />
      <AppointmentTable />
      <Footer />
    </div>
  );
}

export default App;
