let express = require("express");
let path = require("path");
let logger = require("morgan");
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let windowsRouter = require("./routes/windows");

let app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/windows", windowsRouter);

require("./startup/db")();
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
