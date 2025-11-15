import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Doctors from './pages/Doctors'
import MyAppointments from './pages/MyAppointments'
import DoctorProfile from './pages/DoctorProfile'

function App(){
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/doctors" element={<Doctors/>} />
          <Route path="/appointments" element={<MyAppointments/>} />
          <Route path="/doctors/:id" element={<DoctorProfile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
