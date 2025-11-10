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
    </div>
  );
}
