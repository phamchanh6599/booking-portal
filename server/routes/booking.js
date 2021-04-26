const express = require('express');

const router = express.Router();

const Booking = require('../model/Booking');
const verifyMw = require('../middleware/verifyMw');
const bookingSchemas = require('../schemas/bookingSchema');

// @route GET api/booking/all
// @access Private
router.get('/all', verifyMw.verifyToken(), async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('user', [
      'username',
    ])
    res.json({ success: true, bookings })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route DELETE api/booking/cancel/:id
// @access Private
router.delete('/cancel/:id', verifyMw.verifyToken(), async (req, res) => {
  try {
    const bookingDeleted = { _id: req.params.id, user: req.userId }
    const isSuccessDeleted = await Booking.findOneAndDelete(bookingDeleted)

    if (!isSuccessDeleted) {
      return res.status(401).json({
        success: false,
        message: 'Booking not found or user not authorised',
      })
    }
    res.status(200).json({ success: true, message: 'Delete successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route POST api/booking
// @access Private
router.post(
  '/',
  [verifyMw.verifyToken(), verifyMw.verifySchema(bookingSchemas.bookingSchemaPost)],
  async (req, res) => {
    const {
      type, location, data_time_1, data_time_2, data_time_3,
    } = req.body;

    try {
      const newBooking = new Booking({
        type,
        location,
        data_time_1,
        data_time_2,
        data_time_3,
        user: req.userId,
      });

      await newBooking.save();
      return res.status(200).json({
        success: true,
        message: 'Created Booking successfully',
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

// @route DELETE api/booking/update/:id
// @access Private
router.put('/update/:id', [verifyMw.verifyToken(), verifyMw.verifySchema(bookingSchemas.bookingSchemaUpdate)], async (req, res) => {
  try {
    const { status } = req.body

    const isUpdatedSuccess = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { status },
      { new: true },
    )

    if (!isUpdatedSuccess) {
      return res.status(401).json({
        success: false,
        message: 'Booking not found or user not authorised',
      })
    }

    res.json({
      success: true,
      message: 'Updated Successfully!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router;
