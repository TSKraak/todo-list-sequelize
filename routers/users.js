const express = require("express");
const { Router } = express;
const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    const cleanUsers = users.map((u) => {
      const { password, ...restOfUser } = u.dataValues; // by destructuring password and copying the array after that, password gets filtered out
      return restOfUser;
    });
    res.send(cleanUsers);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  try {
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address"); // Set status to 400 'Bad request' and return message
    } else {
      const user = await User.create({ name, email, phone, password });
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
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

router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, password, phone } = req.body;
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update({
        name,
        email,
        password,
        phone,
      });
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

// delete single list of a user
router.delete("/:userId/lists/:listId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { listId } = req.params;
    const user = await User.findByPk(userId);
    const getList = await TodoList.findByPk(listId);
    if (!getList) {
      return res.status(404).send("No list found with that ID");
    }
    await getList.destroy();
    res.json(
      `List ${getList.name} with id ${listId} of user ${user.name} deleted`
    );
  } catch (error) {
    next(error);
  }
});

// delete all lists of a user
// router.delete("/:userId/lists", async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const getUserLists = await User.findByPk(userId, {
//       include: [TodoList],
//     });
//     // console.log(getUserLists);
//     if (!getUserLists || getUserLists.todoLists.length === 0) {
//       return res.status(404).send("No user or lists found with that ID");
//     }
//     getUserLists.todoLists.forEach(async (list) => await list.destroy());
//     console.log(getUserLists.name);
//     res.status(204).json(); // with 204 'No Content' you are not able to send a message. To do that use 200.
//   } catch (error) {
//     next(error);
//   }
// });

// OTHER OPTION FOR: delete all lists of a user
router.delete("/:userId/lists/", async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const allLists = await TodoList.destroy({ where: { userId: userId } });
    // console.log(allLists);

    res.json(allLists);
  } catch (e) {
    next(e);
  }
});

// create new list for a specifid user
router.post("/:userId/lists", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    const getUser = await User.findByPk(userId, { include: [TodoList] });
    if (!getUser) {
      return res.status(404).send("No user found with that ID");
    }
    if (!name) {
      return res.status(400).send("Missing list name parameter");
    }
    const newList = await TodoList.create({ userId, name });
    res.json(newList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
