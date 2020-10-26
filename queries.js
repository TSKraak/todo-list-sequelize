const User = require("./models").user;

async function createUserList() {
  try {
    const allUsers = await User.findAll();
    return allUsers.map((user) => user.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

// createUserList().then((users) => console.log(users));

const todoItem = require("./models").todoItem;

async function createTodoItemList() {
  try {
    const allTodoItems = await todoItem.findAll();
    return allTodoItems.map((item) => item.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

// createTodoItemList().then((result) => console.log(result));

async function findUserById(id) {
  try {
    const userById = await User.findByPk(id);
    return userById ? userById.get({ plain: true }) : "User not found!";
  } catch (e) {
    console.error(e);
  }
}

// findUserById(3).then((users) => console.log(users));

async function createNewUser() {
  try {
    const newUser1 = await User.create({
      name: "Steph Bergman",
      email: "steph@bergman.com",
      phone: 16464613,
      password: "chicolate",
    });

    return [newUser1].map((user) => user.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

// createNewUser().then((user) => console.log(user));

async function importantTodoItems() {
  try {
    const importantTodos = await todoItem.findAll({
      where: { important: true },
    });
    return importantTodos.map((item) => item.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

// importantTodoItems().then((todos) => console.log(todos));
