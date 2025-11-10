import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppointmentForm() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [datetime, setDatetime] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/doctors')
      .then(r => r.json())
      .then(list => setDoctors(list))
      .catch(() => setMessage('Failed to load doctors'));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    const token = localStorage.getItem('token');
    if (!token) return setMessage('You must be logged in to book an appointment.');
    if (!doctorId || !datetime) return setMessage('Please choose a doctor and datetime.');

    // convert datetime-local (e.g. 2025-11-20T15:30) to SQL-friendly format if needed
    let dt = datetime;
    if (dt.includes('T')) {
      dt = dt.replace('T', ' ');
      if (dt.length === 16) dt = dt + ':00';
    }

    try {
      const res = await fetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ doctor_id: parseInt(doctorId, 10), datetime: dt, reason })
      });
      const data = await res.json();
      if (res.status === 201) {
        setMessage('Appointment created successfully');
        navigate('/');
      } else {
        setMessage('Error: ' + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Book an Appointment</h2>
      <form onSubmit={submit}>
        <div>
          <label>Doctor</label><br />
          <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
            <option value="">-- choose a doctor --</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
            ))}
          </select>
        </div>

        <div style={{marginTop:10}}>
          <label>Date & time</label><br />
          <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} required />
        </div>

        <div style={{marginTop:10}}>
          <label>Reason</label><br />
          <input value={reason} onChange={e => setReason(e.target.value)} />
        </div>

        <div style={{marginTop:10}}>
          <button type="submit">Book</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
