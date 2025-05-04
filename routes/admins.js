const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM admins", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { user_id, permissions, department } = req.body;
  const query = `INSERT INTO admins (user_id, permissions, department) VALUES (?, ?, ?)`;
  db.query(query, [user_id, JSON.stringify(permissions), department], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Admin created", admin_id: result.insertId });
  });
});

module.exports = router;
