const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

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
            db.close();
            process.exit(0);
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
