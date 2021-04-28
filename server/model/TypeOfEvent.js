const mongoose = require('mongoose');

const { Schema } = mongoose;

const TypeEventSchema = new Schema({
  type: {
    type: String,
  },
});

module.exports = mongoose.model('events', TypeEventSchema);
