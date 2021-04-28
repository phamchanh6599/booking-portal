const Joi = require('joi');

const bookingSchemaPost = Joi.object().keys({
  type: Joi.string().required().messages({
    'string.empty': 'Type cannot be an empty field.',
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location cannot be an empty field.',
  }),
  date_time_1: Joi.date(),
  date_time_2: Joi.date(),
  date_time_3: Joi.date(),
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED'),
});

const bookingSchemaUpdate = Joi.object().keys({
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').required(),
});

module.exports = { bookingSchemaPost, bookingSchemaUpdate };
