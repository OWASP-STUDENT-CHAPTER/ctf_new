const mongoose = require("mongoose");
const { eventDB } = require("../init/db");

// { answer(hashed) can use bcrypt title body points?
//   round id/questionNumber filesAssosiacted -> use multer }

const hintSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = eventDB.model("Hint", hintSchema);
