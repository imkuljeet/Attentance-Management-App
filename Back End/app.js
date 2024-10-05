const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const User = require('./models/users');
const Attendance = require('./models/attendance');

const app = express();

app.use(bodyParser.json());
app.use(cors());

User.hasMany(Attendance);
Attendance.belongsTo(User);

app.use("/markAttendance", async (req, res) => {
  console.log("REQ BODY IS", req.body);

  const { date, attendance } = req.body;

  try {
    for (const entry of attendance) {
      const { student, status } = entry;

      // Find or create the student
      const [user, created] = await User.findOrCreate({
        where: { name: student },
        defaults: { name: student }
      });

      if (created) {
        console.log(`User ${student} was created.`);
      }

      // Create the attendance record for the user
      await Attendance.create({
        date: date,
        status: status,
        UserId: user.id // associate the attendance with the user
      });

      console.log(`Attendance for ${student} on ${date} recorded as ${status}.`);
    }

    res.send("Attendance marked successfully");
  } catch (err) {
    console.error("Error marking attendance:", err);
    res.status(500).send("Error marking attendance");
  }
});


sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
