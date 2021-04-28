const express = require('express');

const router = express.Router();

const TypeEventSchema = require('../model/TypeOfEvent');

// @route GET api/event/all
// @access Public
router.get('/all', async (req, res) => {
  try {
    const type = await TypeEventSchema.find();
    res.json({ success: true, type });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
