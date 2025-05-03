"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // เปลี่ยนประเภทของคอลัมน์ tour_info เป็น JSON
    await queryInterface.changeColumn("packages", "tour_info", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // ย้อนกลับประเภทของคอลัมน์ tour_info เป็น TEXT ในกรณีที่ต้อง revert migration
    await queryInterface.changeColumn("packages", "tour_info", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
