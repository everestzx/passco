const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO membership_applications (
      last_name, first_name, middle_name, suffix, date_of_birth, age, gender, civil_status, religion,
      address_permanent, address_present, contact_number, email_address, facebook_name,
      occupation, job_title, date_hired, monthly_income, employer, employer_contact,
      employer_address, employment_status, education, school_last_attended,
      tin, sss, pagibig, philhealth, umid, other_id, household_size,
      spouse_name, spouse_birthdate, spouse_mobile, spouse_email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.lastName, data.firstName, data.middleName, data.suffix, data.dateOfBirth, data.age,
    data.gender, data.civilStatus, data.religion, data.addressPermanent, data.addressPresent,
    data.contactNumber, data.emailAddress, data.facebookName, data.occupation, data.jobTitle,
    data.dateHired, data.monthlyIncome, data.employer, data.employerContact, data.employerAddress,
    data.employmentStatus, data.education, data.schoolLastAttended, data.tin, data.sss, data.pagibig,
    data.philhealth, data.umid, data.otherId, data.householdSize, data.spouseName,
    data.spouseBirthdate, data.spouseMobile, data.spouseEmail
  ];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Membership application submitted", id: result.insertId });
  });
});

module.exports = router;
