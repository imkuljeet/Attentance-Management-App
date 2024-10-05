const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Attendance = sequelize.define("attendance", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull : false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  status : {
    type : Sequelize.STRING,
    allowNull : false
  }
});

module.exports = Attendance;
