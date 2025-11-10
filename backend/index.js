const express = require('express');
const app = express();
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');

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

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
