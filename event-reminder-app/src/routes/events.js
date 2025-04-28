const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createEvent, getEvents } = require('../controllers/eventController');

router.use(auth);
router.post('/', createEvent);
router.get('/', getEvents);

module.exports = router;