const mongoose = require("mongoose");
const { eventDB } = require("../init/db");
const { ROUNDS } = require("../utils/CONSTANTS");

const eventSchema = new mongoose.Schema({
  currentRound: {
    type: Number,
    required: true,
    enum: ROUNDS,
    default: 1,
  },
  isActive: { type: Boolean, default: true },
  startTime: {type: Date, default: Date.now },
  endTime: {type: Date, default: Date.now},
  nextRoundStartTime: {type: Date , defalt : Date.now},
});

const Event = eventDB.model("Event", eventSchema);

module.exports = Event;
