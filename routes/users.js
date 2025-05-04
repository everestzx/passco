const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all users (joining account to get full name)
router.get("/", (req, res) => {
  const query = `
    SELECT 
      u.id,
      CONCAT(a.first_name, ' ', a.last_name) AS full_name,
      u.email,
      u.role,
      u.address,
      u.phone
    FROM users u
    JOIN account a ON u.account_id = a.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create a new user (linking to an account)
router.post("/", (req, res) => {
  const { account_id, password_hash, email, role, address, phone } = req.body;

  // Ensure role is valid
  const validRoles = ["member", "non-member", "admin"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role. Must be member, non-member, or admin." });
  }

  const query = `
    INSERT INTO users (account_id, password_hash, email, role, address, phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [account_id, password_hash, email, role, address, phone], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User created", user_id: result.insertId });
  });
});

module.exports = router;
