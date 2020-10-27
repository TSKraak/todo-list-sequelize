"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Thomas Kraak",
          email: "thomas@kraak.com",
          phone: 14462246,
          password: "test",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Steph Bergman",
          email: "steph@bergman.com",
          phone: 16464613,
          password: "chicolate",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ramin Kader",
          email: "ramin@kader.com",
          phone: 1472536,
          password: "elkadir",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
