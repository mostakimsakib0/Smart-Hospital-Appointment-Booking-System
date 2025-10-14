const express = require('express');
const app = express();
const port = 3001;

// Hello World API endpoint
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to the Smart Hospital Appointment Booking System (Backend API).');
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
