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

module.exports = db;
