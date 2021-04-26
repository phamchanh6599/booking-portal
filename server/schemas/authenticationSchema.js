const Joi = require('joi');

const registerSchema = Joi.object().keys({
  username: Joi.string().min(6).max(20).required(),
  password: Joi.string().min(6).max(20).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
});

const loginSchema = Joi.object().keys({
  username: Joi.string().max(20).required().messages({
    'string.empty': 'Username cannot be an empty field.',
    'string.max': 'Username cannot be longer than 20 characters.',
  }),
  password: Joi.string().max(20).required().messages({
    'string.empty': 'Password cannot be an empty field.',
    'string.max': 'Password cannot be longer than 20 characters.',
  }),
});

module.exports = { registerSchema, loginSchema };
