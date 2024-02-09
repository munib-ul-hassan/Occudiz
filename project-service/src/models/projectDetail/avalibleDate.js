const mongoose = require("mongoose");

const WrokingDateSchma = new mongoose.Schema({
  workingDays: [
    {
      type: String,
    },
  ],
  holidays: {
    type: Date,
  },
  workingTime: [
    {
      type: String,
    },
  ],
});
const WorkingDate = mongoose.model("WorkingDate", WrokingDateSchma);

module.exports = WorkingDate;
