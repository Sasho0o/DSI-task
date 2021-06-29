const express = require("express");
const { pool } = require("../server/pool");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
const JWT_TOKEN_LIFETIME = "1200s";

const usersRouter = express.Router();

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
          let token = jwt.sign({ data: result }, "secret", {
            expiresIn: JWT_TOKEN_LIFETIME,
          });
          res.send({ token });
        }
      }
    });
  } catch (error) {
    res.status(400);
    res.send();
  }
});

module.exports = usersRouter;
