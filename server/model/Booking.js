const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date_time_1: {
    type: Date,
    default: Date.now,
  },
  date_time_2: {
    type: Date,
    default: Date.now,
  },
  date_time_3: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  },
  reason_fail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = mongoose.model('booking', BookingSchema);
