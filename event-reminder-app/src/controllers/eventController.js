const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const ev = await Event.create({ ...req.body, user: req.user._id });
  res.status(201).json(ev);
};

exports.getEvents = async (req, res) => {
  const { sortBy = 'date', category, reminder } = req.query;
  const filter = { user: req.user._id };
  if (category) filter.category = category;
  if (reminder === 'true') filter.reminderAt = { $exists: true };
  const events = await Event.find(filter).sort(sortBy);
  res.json(events);
};