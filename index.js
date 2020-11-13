const express = require("express");
const app = express();
const port = 4000;
const usersRouter = require("./routers/users");
const todoListsRouter = require("./routers/todoLists");

app.use(express.json()); // body-parsers

app.use("/users", usersRouter);
app.use("/lists", todoListsRouter);

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(
  // with app.listen you assign the port and as a second argument a callback function
  port, // TCP port where the server listens
  onListen // callback runs when server starts
);
