const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },

  duration: {
    type: Number,
  },
});

const Tasks = mongoose.model("Task", schema);
module.exports = Tasks;
