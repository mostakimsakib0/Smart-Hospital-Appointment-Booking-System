import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Not logged in. Please login.');
      return;
    }
    fetch('/me', { headers: { Authorization: 'Bearer ' + token } })
      .then(r => r.json())
      .then(data => {
        if (data && data.name) {
          setUser(data);
          setMessage(null);
          // fetch doctors (public)
          fetch('/doctors')
            .then(r => r.json())
            .then(dlist => setDoctors(dlist))
            .catch(() => {});
          // fetch appointments for current user
          fetch('/appointments', { headers: { Authorization: 'Bearer ' + token } })
            .then(r => r.json())
            .then(alist => setAppointments(alist))
            .catch(() => {});
        } else {
          setMessage('Failed to fetch user: ' + (data.error || JSON.stringify(data)));
        }
      })
      .catch(() => setMessage('Network error'));
  }, []);

  return (
    <div style={{padding:20}}>
      <h2>Dashboard</h2>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <p>Welcome, {user.name} ({user.email})</p>
        </div>
      )}

      <section style={{marginTop:20}}>
        <h3>Available Doctors</h3>
        {doctors.length === 0 ? <p>No doctors found.</p> : (
          <ul>
            {doctors.map(d => (
              <li key={d.id}><strong>{d.name}</strong> — {d.specialty} — {d.bio} (rating: {d.rating})</li>
            ))}
          </ul>
        )}
      </section>

      <section style={{marginTop:20}}>
        <h3>Your Appointments</h3>
        {appointments.length === 0 ? <p>No appointments.</p> : (
          <ul>
            {appointments.map(a => (
              <li key={a.id}>{a.datetime} with {a.doctor} — {a.status}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
