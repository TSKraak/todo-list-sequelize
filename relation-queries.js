const User = require("./models").user;
const TodoList = require("./models").todoList;
const TodoItem = require("./models").todoItem;

const listWithUsers = async () => {
  const lists = await TodoList.findAll({
    include: [{ model: User, attributes: ["name"] }],
  });
  console.log(lists.map((list) => list.get({ plain: true })));
};
// listWithUsers();

const itemWithLists = async () => {
  const items = await TodoItem.findAll({
    include: [TodoList],
  });
  console.log(items.map((item) => item.get({ plain: true })));
};
// itemWithLists();

const itemWithListsName = async () => {
  const items = await TodoItem.findAll({
    include: [{ model: TodoList, attributes: ["id", "name"] }],
  });
  console.log(items.map((item) => item.get({ plain: true })));
};
// itemWithListsName();

const getUsers = async () => {
  const allUsers = await User.findAll({
    include: [{ model: TodoList, attributes: ["id", "name"] }],
  });
  console.log(allUsers.map((user) => user.get({ plain: true }))[0]);
};
// getUsers();

const getUserWithList = async (id) => {
  const userWithId = await User.findByPk(id, {
    include: [{ model: TodoList, attributes: ["id", "name"] }],
  });
  console.log(userWithId.get({ plain: true }));
};
// getUserWithList(1);

const importantItemsWithList = async () => {
  const items = await TodoItem.findAll({
    where: { important: true },
    include: [{ model: TodoList, attributes: ["id", "name"] }],
  });
  console.log(items.map((item) => item.get({ plain: true })));
};
// importantItemsWithList();

const getUserListTasks = async (id) => {
  const userWithId = await User.findByPk(id, {
    include: [
      {
        model: TodoList,
        attributes: ["id", "name"],
        include: [{ model: TodoItem, attributes: ["task"] }],
      },
    ],
  });
  console.log(userWithId.get({ plain: true }).todoLists[0].todoItems);
};
// getUserListTasks(1);
