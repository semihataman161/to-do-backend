const UserRepository = require('./user.repository');
const bcrypt = require('bcrypt');
const customErrors = require('../custom.errors');
const User = require('./user.entity');

const SALT_ROUNDS = 10;

const createUser = async (request) => {
  const { userName, password } = request;
  const user = new User(userName, password);

  try {
    // Check if user exists
    const existingUser = await UserRepository.getUserByUserName(userName);
    if (existingUser) {
      throw new customErrors.ToDoAppError(`User with user name ${userName} already exists!`, { statusCode: 409 });
    }

    // If the user does not exist, hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = hashedPassword;
    const newUser = await UserRepository.createUser(user);
    return newUser;
  } catch (error) {
    throw error;
  }
}

const login = async (request) => {
  const { userName, password } = request;

  try {
    // Check if user exists
    const user = await UserRepository.getUserByUserName(userName);
    if (!user) {
      throw new customErrors.ToDoAppError(`Invalid credentials!`, { statusCode: 401 });
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new customErrors.ToDoAppError(`Invalid credentials!`, { statusCode: 401 });
    }

    // Return user details if login is successful
    return {
      _id: user.id,
      userName: user.username,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, login };