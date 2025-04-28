const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  reminderAt: { type: Date },
  reminderSent: { type: Boolean, default: false },
  category: { type: String, enum: ['Meeting','Birthday','Appointment','Other'], default: 'Other' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);