/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - username
 *        - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         username: 'semihataman'
 *         password: '12345'
 */

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

module.exports = User;