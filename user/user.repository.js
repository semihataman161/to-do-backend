const pool = require('../db');

class UserRepository {
  async createUser(user) {
    const { userName, password } = user;
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [userName, password];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getUserByUserName(userName) {
    const query = 'SELECT * FROM users WHERE userName = $1';
    const values = [userName];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository();
