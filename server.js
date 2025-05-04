const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/admins", require("./routes/admins"));
app.use("/api/loan-approvals", require("./routes/loanApprovals"));
app.use("/api/loan-comakers", require("./routes/loanComakers"));
app.use("/api/loan-deductions", require("./routes/loanDeductions"));
app.use("/api/account", require("./routes/account"));      
app.use("/api/loan-applications", require("./routes/loanApplications"));
app.use("/api/login", require("./routes/login"));           


const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pascco",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database 'pascco'");
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

module.exports = db;
