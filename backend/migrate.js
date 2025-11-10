const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbFile = path.join(__dirname, 'db.sqlite3');
const sqlFile = path.join(__dirname, 'sql', 'create_tables.sql');

function runMigrations() {
  const sql = fs.readFileSync(sqlFile, 'utf8');
  const db = new sqlite3.Database(dbFile);

  db.exec(sql, (err) => {
    if (err) {
      console.error('Migration failed:', err);
      process.exit(1);
    } else {
      console.log('Migrations applied successfully.');
      // Seed roles if not exist
      db.get("SELECT COUNT(*) as cnt FROM roles", (e, row) => {
        if (e) {
          console.error('Error checking roles:', e);
          db.close();
          process.exit(1);
        }
        if (row.cnt === 0) {
          const stmt = db.prepare("INSERT INTO roles (name) VALUES (?)");
          ['patient','doctor','admin'].forEach(r => stmt.run(r));
          stmt.finalize(() => {
            console.log('Seeded roles.');
              // Seed a specialty, a doctor user, a doctor profile and an appointment for demo
              db.get("SELECT id FROM specialties LIMIT 1", (se, srow) => {
                if (se) {
                  console.error('Error checking specialties:', se);
                  db.close();
                  process.exit(1);
                }
                const seedSpecialty = () => {
                  // insert specialty
                  db.run("INSERT INTO specialties (name) VALUES (?)", ['General Medicine'], function(errSpec) {
                    if (errSpec) {
                      console.error('Error inserting specialty:', errSpec);
                      db.close();
                      process.exit(1);
                    }
                    const specialtyId = this.lastID;
                    seedDoctorAndAppointment(specialtyId);
                  });
                };

                const seedDoctorAndAppointment = (specialtyId) => {
                  // create a doctor user if not exists
                  db.get("SELECT id FROM users WHERE email = ?", ['dr.john@example.com'], (ue, urow) => {
                    if (ue) {
                      console.error('Error checking doctor user:', ue);
                      db.close();
                      process.exit(1);
                    }
                    const createDoctor = (roleId) => {
                      const demoPasswordHash = bcrypt.hashSync('Password123!', 8);
                      db.run("INSERT INTO users (name, email, password_hash, role_id) VALUES (?,?,?,?)", ['Dr. John Doe', 'dr.john@example.com', demoPasswordHash, roleId], function(ier) {
                        if (ier) {
                          console.error('Error creating doctor user:', ier);
                          db.close();
                          process.exit(1);
                        }
                        const doctorUserId = this.lastID;
                        db.run("INSERT INTO doctors (user_id, specialty_id, bio, rating) VALUES (?,?,?,?)", [doctorUserId, specialtyId, 'Experienced general physician', 4.5], function(der) {
                          if (der) {
                            console.error('Error creating doctor profile:', der);
                            db.close();
                            process.exit(1);
                          }
                          const doctorId = this.lastID;
                          // Create a patient user and an appointment
                          const demoPatientHash = bcrypt.hashSync('Password123!', 8);
                          db.run("INSERT INTO users (name, email, password_hash, role_id) VALUES (?,?,?,?)", ['Alice Patient', 'alice@example.com', demoPatientHash, 1], function(perr) {
                            if (perr) {
                              console.error('Error creating patient user:', perr);
                              db.close();
                              process.exit(1);
                            }
                            const patientId = this.lastID;
                            db.run("INSERT INTO appointments (patient_id, doctor_id, datetime, status, reason) VALUES (?,?,?,?,?)", [patientId, doctorId, '2025-11-20 15:30:00', 'scheduled', 'Regular checkup'], function(aerr) {
                              if (aerr) {
                                console.error('Error creating appointment:', aerr);
                                db.close();
                                process.exit(1);
                              }
                              console.log('Seeded sample doctor, patient and appointment.');
                              db.close();
                              process.exit(0);
                            });
                          });
                        });
                      });
                    };

                    if (urow) {
                      // doctor user exists, skip creating
                      db.close();
                      process.exit(0);
                    } else {
                      // look up doctor role id
                      db.get("SELECT id FROM roles WHERE name = ?", ['doctor'], (re, rrow) => {
                        const roleId = (rrow && rrow.id) || 2;
                        createDoctor(roleId);
                      });
                    }
                  });
                };

                if (srow) {
                  seedDoctorAndAppointment(srow.id);
                } else {
                  seedSpecialty();
                }
              });
          });
        } else {
          db.close();
          process.exit(0);
        }
      });
    }
  });
}

if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
