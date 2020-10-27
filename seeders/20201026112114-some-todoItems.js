"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "Bananas",
          deadline: "01-11-2020",
          important: false,
          todoListId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Apples",
          deadline: "01-11-2020",
          important: false,
          todoListId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Vacuum cleaning",
          deadline: "29-10-2020",
          important: true,
          todoListId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "New bed",
          deadline: "01-01-2022",
          important: true,
          todoListId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
