const { User, Doctor } = require('./models');

async function seed(){
  const count = await User.count();
  if (count === 0){
    await User.create({ name: 'Test Patient', email: 'patient@example.com', password: 'password123' });
  }

  const dcount = await Doctor.count();
  if (dcount === 0){
    await Doctor.bulkCreate([
      { name: 'Dr. Aisha Rahman', specialty: 'Cardiology', bio: 'Experienced cardiologist.' },
      { name: 'Dr. Kamal Hossain', specialty: 'Dermatology', bio: 'Skin specialist.' },
      { name: 'Dr. Farhana Akter', specialty: 'Pediatrics', bio: 'Children healthcare.' }
    ]);
  }
}

module.exports = seed;
