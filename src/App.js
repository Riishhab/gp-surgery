import './App.css';
import './styles.scss';
import Header from './header';
import Back from './Back';
import Footer from './footer';
import AppointmentTable from './AppointmentTable';

function App() {
  return (
    <div className="App">
      <Header />
      <Back />
      <AppointmentTable />
      <Footer />
    </div>
  );
}

export default App;
