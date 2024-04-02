const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const UserService = require('./user.service');

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const register = asyncHandler(async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  await UserService.createUser(req.body);
  res.status(200).json({ message: 'User registered successfully.' });
});

const login = asyncHandler(async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, password } = req.body;

  const token = await UserService.login(username, password);
  res.status(200).json({ token });
});

module.exports = { register, login };