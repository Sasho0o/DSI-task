const express = require("express");

const employeesRouter = require("../controllers/employee-controller");
const usersRouter = require("../controllers/user-controller");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/employee", employeesRouter);
app.use("/api/user", usersRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
