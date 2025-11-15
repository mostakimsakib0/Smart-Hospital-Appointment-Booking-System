const express = require('express');
const router = express.Router();
const { Doctor } = require('../models');

router.get('/', async (req, res) => {
  const doctors = await Doctor.findAll();
  res.json(doctors);
});

module.exports = router;
