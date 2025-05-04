const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM loan_comakers", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const data = req.body;
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => "?").join(",");
  const query = `INSERT INTO loan_comakers (${keys.join(",")}) VALUES (${placeholders})`;
  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Loan comaker added", comaker_id: result.insertId });
  });
});

module.exports = router;
