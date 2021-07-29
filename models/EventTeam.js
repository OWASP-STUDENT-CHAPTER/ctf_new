const mongoose = require("mongoose");
const { eventDB } = require("../init/db");
const Participant = require("./participant");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  powerHints: {
    type: Number,
    required: true,
    default: 0,
  },
  snap: {
    type: Boolean,
    required: true,
    default: false,
  },
  finished: {
    type: Boolean,
    required: true,
    default: false,
  },
  stoneActive: [
    {
      type: String,
      trim: true,
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Participant,
    },
  ],
  stones: [
    {
      type: String,
      enum: ["power", "space", "reality", "soul", "time", "mind", ""],
    },
  ],
  hintsTaken: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  progress: {
    questionNumber: {
      type: Number,
      default: 0,
    },
    roundNumber: {
      type: Number,
      default: 0,
    },
  },
});

const Team = eventDB.model("EventTeam", teamSchema);
module.exports = Team;
