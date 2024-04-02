/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - userName
 *        - password
 *       properties:
 *         userName:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         userName: 'semihataman'
 *         password: '2a$10$9MJmPugtiDDfq5F/XdnpJeYtGYyxquopaghX1uzyTFLMCfoDFbj3s'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * 
 * /api/user/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * 
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *              userName: 
 *                type: string
 *              password:
 *                type: string
 *           example:
 *             userName: semihataman
 *             password: '1234'
 *     responses:
 *       200:
 *         description: Login is successfull.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

class User {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }
}

module.exports = User;