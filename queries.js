const User = require("./models").user;
const TodoItem = require("./models").todoItem;

async function createUserList() {
  try {
    const allUsers = await User.findAll();
    return allUsers.map((user) => user.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

// createUserList().then((users) => console.log(users));

async function createTodoItemList() {
  try {
    const allTodoItems = await TodoItem.findAll();
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
    const importantTodos = await TodoItem.findAll({
      where: { important: true },
    });
    return importantTodos.map((item) => item.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}

// importantTodoItems().then((todos) => console.log(todos));

const newUser = async (myName, email, password) => {
  try {
    const newUser = await User.create({ name: myName, email, password });
    console.log(newUser.get({ plain: true }));
  } catch (e) {
    console.log(e.message);
  }
};

// newUser("Rein", "rein@r.com", "1234");

// updating data
const changeName = async (id, newName) => {
  const userToUpdate = await User.findByPk(id);
  // maybe the guy doesn't exist => 404
  await userToUpdate.update({ name: newName });
  console.log(userToUpdate.get({ plain: true }));
};

// changeName(1, "kelley");

// deleting data
const deleteUser = async (id) => {
  const userToDelete = await User.findByPk(id);
  await userToDelete.destroy();
};

// deleteUser(1);
