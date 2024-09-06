// routes/distress.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const DistressSignal = require('../models/DistressSignal');

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('phone', 'Valid phone number is required').isLength({ min: 10, max: 10 }),
    check('location', 'Location is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, location, message } = req.body;

    try {
      const newSignal = new DistressSignal({
        name,
        phone,
        location,
        message,
      });

      await newSignal.save();
      res.json({ message: 'Distress signal sent successfully!' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
