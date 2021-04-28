/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const authSchemas = require('../schemas/authenticationSchema');
const verifyMw = require('../middleware/verifyMw');

// @route POST api/auth/register
// @access PUBLIC
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing username or password' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'Username already taken' });
    }

    const hassPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hassPassword, role });
    await newUser.save();
    res.json({ success: true, message: 'Register successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route POST api/auth/login
// @access Public
router.post('/login', verifyMw.verifySchema(authSchemas.loginSchema), async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Incorrect username and/or password',
    });
  }

  try {
    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword || !user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect username or password',
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
    );

    return res
      .status(200)
      .json({
        success: true,
        message: 'Login successfully',
        accessToken,
        role: user.role,
        username: user.username,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
