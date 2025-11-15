const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const seed = require('./seed');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/health', (req, res) => res.json({ ok: true, env: 'development' }));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 4000;

async function start(){
  await sequelize.sync();
  await seed();
  app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
