const Joi = require('joi');

const roundValidator = (body) => {
  const schema = Joi.object({
    currentRound: Joi.number().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    nextRoundStartTime: Joi.date().required(),
  });
  return schema.validate(body);
};

function msToTime( milliseconds ) {
  var day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return {
      days: day,
      hours: hour,
      minutes: minute,
      seconds: seconds
  };
}

module.exports = {
  roundValidator,
  msToTime,
};
