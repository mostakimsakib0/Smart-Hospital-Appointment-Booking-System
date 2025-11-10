# Week 3 — Backend: Table Definitions

This document defines SQL table schemas derived from the ER diagram.

## users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

## roles
CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

## specialties
CREATE TABLE specialties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

## doctors
CREATE TABLE doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  specialty_id INTEGER,
  bio TEXT,
  rating REAL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (specialty_id) REFERENCES specialties(id)
);

## appointments
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  datetime DATETIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

## Optional: doctor_specialties (many-to-many)
CREATE TABLE doctor_specialties (
  doctor_id INTEGER NOT NULL,
  specialty_id INTEGER NOT NULL,
  PRIMARY KEY (doctor_id, specialty_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  FOREIGN KEY (specialty_id) REFERENCES specialties(id)
);
