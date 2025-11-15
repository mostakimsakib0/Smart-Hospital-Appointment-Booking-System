const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Appointment, Doctor } = require('../models');

// list appointments for current user
router.get('/', auth, async (req, res) => {
  const appts = await Appointment.findAll({ where: { patientId: req.user.id }, include: ['doctor'] });
  res.json(appts);
});

// book an appointment
router.post('/', auth, async (req, res) => {
  try{
    const { doctorId, date, time } = req.body;
    if (!doctorId || !date || !time) return res.status(400).json({ error: 'Missing fields' });

    // simple conflict check: same doctor, same date & time
    const existing = await Appointment.findOne({ where: { doctorId, date, time } });
    if (existing) return res.status(400).json({ error: 'Slot already booked' });

    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    const appt = await Appointment.create({ doctorId, date, time, patientId: req.user.id });
    res.json(appt);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// update appointment (patient can update their own appointment)
router.put('/:id', auth, async (req, res) => {
  try{
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    if (appt.patientId !== req.user.id) return res.status(403).json({ error: 'Not allowed' });
    const { date, time, status } = req.body;
    if (date) appt.date = date;
    if (time) appt.time = time;
    if (status) appt.status = status;
    await appt.save();
    res.json(appt);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// cancel/delete appointment
router.delete('/:id', auth, async (req, res) => {
  try{
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    if (appt.patientId !== req.user.id) return res.status(403).json({ error: 'Not allowed' });
    await appt.destroy();
    res.json({ ok: true });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
