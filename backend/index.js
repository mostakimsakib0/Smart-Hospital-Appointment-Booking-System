const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { verifyToken, signToken } = require('./auth');
const fs = require('fs');

app.use(cors());
app.use(express.json());

const dbFile = path.join(__dirname, 'db.sqlite3');

// Hello World API endpoint
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to the Smart Hospital Appointment Booking System (Backend API).');
});

// Register endpoint
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password are required' });

  const db = new sqlite3.Database(dbFile);
  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      db.close();
      return res.status(500).json({ error: 'internal error' });
    }
    if (row) {
      db.close();
      return res.status(409).json({ error: 'email already exists' });
    }

    const password_hash = bcrypt.hashSync(password, 8);
    // default role: patient (assume id 1 or look up)
    db.get('SELECT id FROM roles WHERE name = ?', ['patient'], (e, r) => {
      const roleId = (r && r.id) || 1;
      db.run('INSERT INTO users (name, email, password_hash, role_id) VALUES (?,?,?,?)', [name, email, password_hash, roleId], function(insertErr) {
        if (insertErr) {
          db.close();
          return res.status(500).json({ error: 'failed to create user' });
        }
        const userId = this.lastID;
        db.get('SELECT id, name, email FROM users WHERE id = ?', [userId], (ge, userRow) => {
          db.close();
          if (ge) return res.status(500).json({ error: 'failed to retrieve user' });
          return res.status(201).json({ id: userRow.id, name: userRow.name, email: userRow.email });
        });
      });
    });
  });
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  const db = new sqlite3.Database(dbFile);
  db.get('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      db.close();
      return res.status(500).json({ error: 'internal error' });
    }
    if (!row) {
      db.close();
      return res.status(401).json({ error: 'invalid credentials' });
    }
    const matches = bcrypt.compareSync(password, row.password_hash);
    if (!matches) {
      db.close();
      return res.status(401).json({ error: 'invalid credentials' });
    }

    const token = signToken({ id: row.id, email: row.email });
    db.close();
    return res.json({ token, user: { id: row.id, name: row.name, email: row.email } });
  });
});

// Protected endpoint to fetch current user
app.get('/me', verifyToken, (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: 'invalid token payload' });
  const db = new sqlite3.Database(dbFile);
  db.get('SELECT id, name, email FROM users WHERE id = ?', [userId], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: 'internal error' });
    if (!row) return res.status(404).json({ error: 'user not found' });
    return res.json({ id: row.id, name: row.name, email: row.email });
  });
});

// Public: list doctors with specialty and user info
app.get('/doctors', (req, res) => {
  const db = new sqlite3.Database(dbFile);
  const q = `SELECT doctors.id as doctor_id, doctors.bio, doctors.rating, specialties.name as specialty, users.id as user_id, users.name as user_name, users.email as user_email
            FROM doctors
            LEFT JOIN specialties ON doctors.specialty_id = specialties.id
            LEFT JOIN users ON doctors.user_id = users.id`;
  db.all(q, [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: 'internal error' });
    const doctors = rows.map(r => ({ id: r.doctor_id, bio: r.bio, rating: r.rating, specialty: r.specialty, name: r.user_name, email: r.user_email }));
    return res.json(doctors);
  });
});

// Protected: list appointments for current user
app.get('/appointments', verifyToken, (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: 'invalid token payload' });
  const db = new sqlite3.Database(dbFile);
  const q = `SELECT appointments.id, appointments.patient_id, appointments.doctor_id, appointments.datetime, appointments.status, appointments.reason, users.name as patient_name, dusers.name as doctor_name
            FROM appointments
            LEFT JOIN users ON appointments.patient_id = users.id
            LEFT JOIN doctors ON appointments.doctor_id = doctors.id
            LEFT JOIN users dusers ON doctors.user_id = dusers.id
            WHERE appointments.patient_id = ?`;
  db.all(q, [userId], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: 'internal error' });
    return res.json(rows.map(r => ({ id: r.id, datetime: r.datetime, status: r.status, reason: r.reason, doctor: r.doctor_name })));
  });
});

// Protected: create an appointment for current user (patient)
app.post('/appointments', verifyToken, (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: 'invalid token payload' });
  const { doctor_id, datetime, reason } = req.body || {};
  if (!doctor_id || !datetime) return res.status(400).json({ error: 'doctor_id and datetime are required' });

  const db = new sqlite3.Database(dbFile);
  // validate doctor exists
  db.get('SELECT id FROM doctors WHERE id = ?', [doctor_id], (err, row) => {
    if (err) {
      db.close();
      return res.status(500).json({ error: 'internal error' });
    }
    if (!row) {
      db.close();
      return res.status(404).json({ error: 'doctor not found' });
    }

    db.run('INSERT INTO appointments (patient_id, doctor_id, datetime, status, reason) VALUES (?,?,?,?,?)', [userId, doctor_id, datetime, 'scheduled', reason || null], function(insertErr) {
      if (insertErr) {
        db.close();
        return res.status(500).json({ error: 'failed to create appointment' });
      }
      const appointmentId = this.lastID;
      db.get('SELECT id, patient_id, doctor_id, datetime, status, reason FROM appointments WHERE id = ?', [appointmentId], (ge, apptRow) => {
        db.close();
        if (ge) return res.status(500).json({ error: 'failed to retrieve appointment' });
        return res.status(201).json(apptRow);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
