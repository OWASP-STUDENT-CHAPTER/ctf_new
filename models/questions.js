const mongoose = require("mongoose");
const { eventDB } = require("../init/db");

// { answer(hashed) can use bcrypt title body points?
//   round id/questionNumber filesAssosiacted -> use multer }

const questionSchema = new mongoose.Schema({
  questionNumber:{
    type:Number,
    required:true,
  },
  answer: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  filesAssociated: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  roundNumber: {
    type: Number,
    required: true,
  },
});

module.exports = eventDB.model("Question", questionSchema);
