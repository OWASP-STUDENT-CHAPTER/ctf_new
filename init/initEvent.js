const Event = require('../models/Event');

module.exports = async (app) => {
  let event = await Event.findOne();

  try {
    if (!event) {
      event = new Event({ currentRound: 'round1' });
      await event.save();
    }
    app.set('event', event);
  } catch (err) {
    console.error(err.message);
    // res.status(500).send('Server error');
  }
};
