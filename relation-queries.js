const User = require("./models").user;
const TodoList = require("./models").todoList;
const TodoItem = require("./models").todoItem;
const Tag = require("./models").tag;

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

const getItemsWithTagById = async (id) => {
  const items = await TodoItem.findByPk(id, {
    attributes: ["task"], //To just show a certain attribute of todoItem
    include: [
      {
        model: TodoList, // Show data from todoList
        attributes: ["name"],
        include: [{ model: User, attributes: ["name"] }], // Show data from user, which is linked to todoList
      },
    ],
  });
  console.log(items.get({ plain: true }));
};
// getItemsWithTagById(4);

const getItemsWithTag = async () => {
  const items = await TodoItem.findAll({ include: [Tag] });
  console.log(items.map((item) => item.get({ plain: true }))[0]); // First index of array of todoItems and then show 'tags'
};
getItemsWithTag();
