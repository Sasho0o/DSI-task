const mysql = require("mysql2");
const express = require("express");

var md5 = require("md5");
var jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

//mysql connection
const pool = mysql.createConnection({
  connectionLimit: 10,
  password: "rootpassword",
  user: "root",
  database: "employeedb",
  host: "localhost",
  port: "3306",
});

const employeesRouter = express.Router();
const usersRouter = express.Router();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

employeesRouter.use((req, res, next) => {
  const authHeader = req.headers["authorization"].slice(7);
  if (!authHeader) {
    res.status(401);
    res.send();
  } else {
    try {
      jwt.verify(authHeader, "secret");
      next();
    } catch (error) {
      res.status(401);
      res.send();
    }
  }
});

app.use("/api/employee", employeesRouter);

app.use("/api/user", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//Get all employees
employeesRouter.get("/", (req, res) => {
  pool.query(
    `
    SELECT user_data.id_user_data, user_data.firstname, user_data.lastname, user_data.phone, user_data.address, department.department_name, position.position_name, user_data.salary 
    FROM user_data 
    INNER JOIN department 
    ON user_data.department_id_department=department.id_department 
    INNER JOIN position 
    ON user_data.position_id_position=position.id_position
    ORDER BY user_data.firstname;`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Get employee data by Id
employeesRouter.get("/:employeeId", (req, res) => {
  pool.query(
    `
  SELECT user_data.id_user_data, user_data.firstname, user_data.lastname, user_data.phone, user_data.address, department.department_name, position.position_name, user_data.salary 
  FROM user_data 
  INNER JOIN department 
  ON user_data.department_id_department=department.id_department 
  INNER JOIN position 
  ON user_data.position_id_position=position.id_position
  WHERE user_data.id_user_data=${req.params.employeeId}
  `,
    (err, rows, fields) => {
      if (!err) {
        if (rows[0]) {
          res.send(rows[0]);
        } else {
          res.status(404);
          res.send();
        }
      } else {
        console.log(err);
      }
    }
  );
});

//Get all predefined positions
employeesRouter.get("/position/all", (req, res) => {
  pool.query(`SELECT * FROM position;`, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//Get all predefined departments
employeesRouter.get("/department/all", (req, res) => {
  pool.query("SELECT * FROM department", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//Update employee data with id
employeesRouter.put("/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  const updatedEmployee = req.body;
  pool.query(
    `
    UPDATE user_data 
    SET firstname=?,lastname=?,phone=?,address=?, salary=?, department_id_department=?, position_id_position=?
    WHERE id_user_data=? `,
    [
      updatedEmployee.firstname,
      updatedEmployee.lastname,
      updatedEmployee.phone,
      updatedEmployee.address,
      updatedEmployee.salary,
      updatedEmployee.department,
      updatedEmployee.position,
      employeeId,
    ],
    (err, rows, fields) => {
      console.log(err, rows, fields);
      if (!err) {
        res.status(201);
      } else {
        res.status(500);
        console.log(err);
      }
      res.send();
    }
  );
});

//Insert an employee
employeesRouter.post("/", (req, res) => {
  const addEmployee = req.body;
  pool.query(
    `
    INSERT INTO user_data 
    SET firstname=?,lastname=?,phone=?,address=?, department_id_department=?, position_id_position=?, salary=? 
     `,
    [
      addEmployee.firstname,
      addEmployee.lastname,
      addEmployee.phone,
      addEmployee.address,
      addEmployee.department,
      addEmployee.position,
      addEmployee.salary,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.status(201);
      } else {
        res.status(500);
        console.log(err);
      }
      res.send();
    }
  );
});

//Delete an employee
employeesRouter.delete("/:id", (req, res) => {
  pool.query(
    "DELETE FROM user_data WHERE id_user_data = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.status(201);
        res.send(req.params.id);
      } else {
        res.status(500);
        console.log(err);
      }
    }
  );
});

//Login into account
usersRouter.post("/login", async function (req, res) {
  try {
    let { email, password } = req.body;
    const hashed_password = md5(password.toString());
    const sql = `
    SELECT users.email, roles.id_role, roles.name
     FROM users 
     JOIN roles 
     ON roles.id_role=users.roles_id_role 
     WHERE email = ? AND password = ?`;
    pool.query(sql, [email, hashed_password], function (err, result, fields) {
      if (err) {
        console.log(err);
        res.status(400);
        res.send();
      } else {
        if (result.length === 0) {
          res.status(400);
          res.send("Wrong email or password");
        } else {
          let token = jwt.sign({ data: result }, "secret");
          res.send({ token });
        }
      }
    });
  } catch (error) {
    res.status(400);
    res.send();
  }
});
