const express = require('express');

const router = express.Router();
const verifyMw = require('../middleware/verifyMw');
const User = require('../model/User');

// @route GET api/user
// @access Private
router.get('/user', verifyMw.verifyToken(), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
