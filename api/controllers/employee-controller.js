const express = require("express");
const jwt = require("jsonwebtoken");

const employeesRouter = express.Router();

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

module.exports = employeesRouter;
