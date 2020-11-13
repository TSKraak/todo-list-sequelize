"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "Food",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Furniture",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
