const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const query = "SELECT * FROM account WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const fullName = `${user.first_name} ${user.last_name}`;
    res.status(200).json({
      message: "Login successful",
      name: fullName,
      customer_id: user.customer_id
    });
  });
});

module.exports = router;
