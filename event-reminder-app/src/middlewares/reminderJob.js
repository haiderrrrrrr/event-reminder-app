const cron = require('node-cron');
const Event = require('../models/Event');
const nodemailer = require('nodemailer');

module.exports = () => {
  cron.schedule(process.env.REMINDER_CRON, async () => {
    const now = new Date();
    const dueEvents = await Event.find({
      reminderAt: { $lte: now },
      reminderSent: false,
    }).populate('user');

    if (!dueEvents.length) return;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const ev of dueEvents) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: ev.user.email,
        subject: `Reminder: ${ev.name}`,
        text: `You have "${ev.name}" scheduled at ${ev.date}`,
      });
      ev.reminderSent = true;
      await ev.save();
    }
  });
};
