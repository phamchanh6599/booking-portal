const Joi = require('joi');

const bookingSchemaPost = Joi.object().keys({
  type: Joi.string().required().messages({
    'string.empty': 'Type cannot be an empty field.',
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location cannot be an empty field.',
  }),
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').required(),
});

const bookingSchemaUpdate = Joi.object().keys({
  status: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').required(),
});

module.exports = { bookingSchemaPost, bookingSchemaUpdate };
