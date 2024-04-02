const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('./user.repository');
const customErrors = require('../custom.errors');

const SALT_ROUNDS = 10;

const createUser = async ({ username, password }) => {
  const user = await UserRepository.getUserByUsername(username);

  if (user) {
    throw new customErrors.ToDoAppError(`User with username: ${username} already exists!`, { statusCode: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return await UserRepository.createUser({ username, password: hashedPassword });
};

const login = async (username, password) => {
  const user = await UserRepository.getUserByUsername(username);

  if (!user) {
    throw new customErrors.ToDoAppError('Invalid credentials!', { statusCode: 401 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new customErrors.ToDoAppError('Invalid credentials!', { statusCode: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

module.exports = { createUser, login };