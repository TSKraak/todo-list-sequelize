const express = require("express");
const { Router } = express;
const TodoList = require("../models").todoList;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allLists = await TodoList.findAll();
    const nameOfLists = allLists.map((list) => list.name);
    if (!nameOfLists) {
      return res.status(400).send("No todo-lists found.");
    }
    res.json(nameOfLists);
  } catch (e) {
    next(e);
  }
});

// add a new todoList
router.post("/", async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    if (!name || name === "") {
      return res.status(400).send("Please provide a name for the Todo-List");
    }
    const newTodoList = await TodoList.create({ name, userId });
    console.log(newTodoList);
    res.json(newTodoList);
  } catch (e) {
    next(e);
  }
});

// update a single list
router.put("/:todoListId", async (req, res, next) => {
  try {
    const { todoListId } = req.params;
    const { name, userId } = req.body; // optional to enter a userId if it changes user
    const listToUpdate = await TodoList.findByPk(todoListId);
    if (!listToUpdate) {
      return res.status(404).send("Todo-List not found");
    }
    const updatedList = await listToUpdate.update({ name, userId }); // userId won't change if no userId parameter is sent
    res.json(updatedList);
  } catch (e) {
    next(e);
  }
});

// show single list
router.get("/:todoListId", async (req, res, next) => {
  try {
    const { todoListId } = req.params;
    const getListById = await TodoList.findByPk(todoListId);
    if (!getListById) {
      return res.status(404).send("Todo-List ID doesn't exist");
    }
    res.json(`List name: ${getListById.name}`);
  } catch (error) {
    next(error);
  }
});

router.delete("/:todoListId", async (req, res, next) => {
  try {
    const { todoListId } = req.params;
    const getListById = await TodoList.findByPk(todoListId);
    if (!getListById) {
      return res.status(404).send("Todo-List ID doesn't exist");
    }
    getListById.destroy();
    res.json(`List with id ${todoListId} deleted`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
