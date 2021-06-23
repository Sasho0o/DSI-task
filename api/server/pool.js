const mysql = require("mysql2");

//mysql connection
module.exports.pool = mysql.createConnection({
  connectionLimit: 10,
  password: "rootpassword",
  user: "root",
  database: "employeedb",
  host: "localhost",
  port: "3306",
});
