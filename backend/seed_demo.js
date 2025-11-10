const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbFile = path.join(__dirname, 'db.sqlite3');

function seedDemo() {
  const db = new sqlite3.Database(dbFile);
  db.serialize(() => {
    // ensure specialty
    db.get("SELECT id FROM specialties WHERE name = ?", ['General Medicine'], (err, row) => {
      if (err) return console.error('err', err);
      const ensureDoctor = (specialtyId) => {
        db.get("SELECT id FROM users WHERE email = ?", ['dr.john@example.com'], (e, urow) => {
          if (e) return console.error('err', e);
          if (urow) return console.log('Doctor user already exists, skip seeding doctor.');
          // find doctor role id
          db.get("SELECT id FROM roles WHERE name = ?", ['doctor'], (re, rrow) => {
            const roleId = (rrow && rrow.id) || 2;
            const demoPasswordHash = bcrypt.hashSync('Password123!', 8);
            db.run("INSERT INTO users (name, email, password_hash, role_id) VALUES (?,?,?,?)", ['Dr. John Doe', 'dr.john@example.com', demoPasswordHash, roleId], function(ier) {
              if (ier) return console.error('err', ier);
              const doctorUserId = this.lastID;
              db.run("INSERT INTO doctors (user_id, specialty_id, bio, rating) VALUES (?,?,?,?)", [doctorUserId, specialtyId, 'Experienced general physician', 4.5], function(der) {
                if (der) return console.error('err', der);
                const doctorId = this.lastID;
                // create patient if not exists
                db.get("SELECT id FROM users WHERE email = ?", ['alice@example.com'], (pe, prow) => {
                  if (pe) return console.error('err', pe);
                  if (prow) return createAppointment(prow.id, doctorId);
                  const demoPatientHash = bcrypt.hashSync('Password123!', 8);
                  db.run("INSERT INTO users (name, email, password_hash, role_id) VALUES (?,?,?,?)", ['Alice Patient', 'alice@example.com', demoPatientHash, 1], function(perr) {
                    if (perr) return console.error('err', perr);
                    createAppointment(this.lastID, doctorId);
                  });
                });
              });
            });
          });
        });
      };

      if (row) {
        ensureDoctor(row.id);
      } else {
        db.run("INSERT INTO specialties (name) VALUES (?)", ['General Medicine'], function(se) {
          if (se) return console.error('err', se);
          ensureDoctor(this.lastID);
        });
      }
    });

    function createAppointment(patientId, doctorId) {
      db.get("SELECT id FROM appointments WHERE patient_id = ? AND doctor_id = ?", [patientId, doctorId], (ae, arow) => {
        if (ae) return console.error('err', ae);
        if (arow) return console.log('Appointment already exists, skipping.');
        db.run("INSERT INTO appointments (patient_id, doctor_id, datetime, status, reason) VALUES (?,?,?,?,?)", [patientId, doctorId, '2025-11-20 15:30:00', 'scheduled', 'Regular checkup'], function(aerr) {
          if (aerr) return console.error('err', aerr);
          console.log('Seeded demo appointment.');
        });
      });
    }
  });
}

if (require.main === module) seedDemo();

module.exports = { seedDemo };
