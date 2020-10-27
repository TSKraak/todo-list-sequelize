const express = require("express");
const app = express();
const port = 4000;

const User = require("./models").user;

app.use(express.json());

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(
  // with app.listen you assign the port and as a second argument a callback function
  port, // TCP port where the server listens
  onListen // callback runs when server starts
);

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address"); // Set status to 400 'Bad request' and return message
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const getUserById = await User.findByPk(userId);
    if (getUserById) {
      res.json(getUserById);
    } else {
      res.status(404).send("User not found"); // Set status code tot 404 'Not found' and return a message.
    }
  } catch (e) {
    next(e);
  }
});
