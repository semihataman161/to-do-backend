const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

const createUser = async ({ username, password }) => {
  return await User.create({ username, password });
};

const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

module.exports = { createUser, getUserByUsername };