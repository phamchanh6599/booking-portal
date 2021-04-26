const Joi = require('joi');

const bookingSchema = Joi.object().keys({
  type: Joi.string().required().messages({
    'string.empty': 'Type cannot be an empty field.',
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location cannot be an empty field.',
  }),
  date_time_1: Joi.date().required().messages({
    'string.empty': 'Date_time_1 cannot be an empty field.',
  }),
  date_time_2: Joi.date().required().messages({
    'string.empty': 'Date_time_2 cannot be an empty field.',
  }),
  date_time_3: Joi.date().required().messages({
    'string.empty': 'Date_time_3 cannot be an empty field.',
  }),
});

module.exports = bookingSchema;
