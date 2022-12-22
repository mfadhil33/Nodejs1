const Joi = require('@hapi/joi');
// const validator = require('validator');

const validateRegister = (data) => {
  const schemaForm = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(10).required(),
    email: Joi.string().email().required(),
  });
  return schemaForm.validate(data);
};

module.exports = { validateRegister };
