const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM loan_deductions", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { application_id, deduction_type, amount } = req.body;
  const query = `INSERT INTO loan_deductions (application_id, deduction_type, amount) VALUES (?, ?, ?)`;
  db.query(query, [application_id, deduction_type, amount], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Deduction added", deduction_id: result.insertId });
  });
});

module.exports = router;
