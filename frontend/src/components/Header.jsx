import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(){
  const navigate = useNavigate()
  function logout(){
    localStorage.removeItem('token')
    navigate('/')
  }
  const token = localStorage.getItem('token')

  return (
    <header className="app-header bg-white py-3 mb-4">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none">
            <h4 className="m-0 text-primary">Medilink</h4>
          </Link>
          <small className="text-muted">Smart Hospital Appointment</small>
        </div>

        <nav>
          <Link to="/" className="btn btn-sm btn-link">Home</Link>
          <Link to="/doctors" className="btn btn-sm btn-link">Doctors</Link>
          {token ? (
            <>
              <Link to="/appointments" className="btn btn-sm btn-outline-primary ms-2">My Appointments</Link>
              <button className="btn btn-sm btn-danger ms-2" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-primary ms-2">Login</Link>
              <Link to="/register" className="btn btn-sm btn-outline-primary ms-2">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
