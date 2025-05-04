// backend/routes/loanApplications.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO loan_applications (
      customer_id, application_date, passbook_client_id, permanent_address,
      length_of_stay_years, length_of_stay_months, occupation, contact_number, tin_number,
      birth_date, age, gender, civil_status, spouse_name, spouse_occupation,
      loan_type, loan_amount, amount_words, term_months, payout_preference,
      payment_mode, purpose, status, borrower_signature, spouse_signature
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', '', '')
  `;

  const values = [
    data.customer_id,                     
    data.application_date || new Date(),  
    data.clientId,
    data.address,
    data.lengthOfStayYears,
    data.lengthOfStayMonths,
    data.occupation,
    data.contactNo,
    data.tin,
    data.birthdate,
    data.age,
    data.gender,
    data.civilStatus,
    data.spouseName,
    data.spouseOccupation,
    data.loanProduct,
    data.loanAmount,
    data.loanAmountWords,
    parseInt(data.loanTerm),
    data.payoutPreference,
    data.paymentMode,
    data.loanPurpose
  ];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Loan application submitted", id: result.insertId });
  });
});

module.exports = router;
