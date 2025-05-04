const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");
const validator = require("validator");

// Function to check if email or phone number already exists
const checkIfExists = (email, phone_number) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT * FROM account WHERE email = ? OR phone_number = ?`;
    db.query(checkQuery, [email, phone_number], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Function to insert a new account
const createAccount = (accountDetails) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO account (
        first_name, last_name, country, province, city,
        phone_number, birth_date, email, password_hash, terms_accepted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      insertQuery,
      [
        accountDetails.firstName,
        accountDetails.lastName,
        accountDetails.country,
        accountDetails.province,
        accountDetails.city,
        accountDetails.phone_number,
        accountDetails.birthdate,
        accountDetails.email,
        accountDetails.password_hash,
        accountDetails.agree ? 1 : 0,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    province,
    city,
    phone_number,
    birthdate,
    email,
    password,
    agree,
  } = req.body;

  try {
    // Input sanitization and validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validator.isMobilePhone(phone_number)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Check if email or phone number already exists
    const results = await checkIfExists(email, phone_number);
    if (results.length > 0) {
      const existing = results[0];
      if (existing.email === email) {
        return res.status(400).json({ message: "Email is already registered." });
      } else if (existing.phone_number === phone_number) {
        return res.status(400).json({ message: "Phone number is already registered." });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create account
    const accountDetails = {
      firstName,
      lastName,
      country,
      province,
      city,
      phone_number,
      birthdate,
      email,
      password_hash: hashedPassword,
      agree,
    };
    const result = await createAccount(accountDetails);

    res.status(201).json({ message: "Account created", account_id: result.insertId });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error while creating account." });
  }
});

module.exports = router;
