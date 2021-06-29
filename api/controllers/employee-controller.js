const express = require("express");
const validator = require("../validator/validator");
const { validationResult } = require("express-validator");
const { pool } = require("../server/pool");
const jwt = require("jsonwebtoken");

const employeesRouter = express.Router();

employeesRouter
  .use((req, res, next) => {
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
  })
  //Get all employees
  .get("/", (req, res) => {
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
  })
  // Get employee data by Id
  .get("/:employeeId", (req, res) => {
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
  })
  //Get all predefined positions
  .get("/position/all", (req, res) => {
    pool.query(`SELECT * FROM position;`, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })
  //Get all predefined departments
  .get("/department/all", (req, res) => {
    pool.query("SELECT * FROM department", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })
  //Update employee data with id
  .put("/:employeeId", validator.validateEmployee, (req, res) => {
    const employeeId = req.params.employeeId;
    const updatedEmployee = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
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
  })
  //Insert an employee
  .post("/", validator.validateEmployee, (req, res) => {
    const addEmployee = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
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
  })
  //Delete an employee
  .delete("/:id", (req, res) => {
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

module.exports = employeesRouter;
