// routes/googleLogin.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { email, name, picture } = req.body;

  if (!email || !name || !picture) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const query = "SELECT * FROM account WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      const insertQuery = `
        INSERT INTO account (email, first_name, last_name, profile_picture)
        VALUES (?, ?, ?, ?)
      `;
      const [firstName, ...lastParts] = name.split(" ");
      const lastName = lastParts.join(" ");
      db.query(insertQuery, [email, firstName, lastName, picture], (err) => {
        if (err) return res.status(500).json({ message: "Insert failed" });
        return res.status(201).json({ message: "User created" });
      });
    } else {
      res.status(200).json({ message: "User exists" });
    }
  });
});

module.exports = router;
