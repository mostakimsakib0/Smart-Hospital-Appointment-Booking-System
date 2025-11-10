
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppointmentForm from './pages/AppointmentForm';

function App() {
  return (
    <Router>
      <div style={{padding:20}}>
        <nav style={{marginBottom:10}}>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/appointment">Book</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/appointment" element={<AppointmentForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
