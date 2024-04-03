/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: The todos managing API
 * 
 * /api/todo/getAll:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all todos
 * 
 * /api/todo/getOne/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a single todo
 * 
 * /api/todo/create:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo created successfully
 * 
 * /api/todo/update/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 * 
 * /api/todo/delete/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */

const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const TodoController = require('./todo.controller');

const router = express.Router();
router.get('/getAll', authenticateToken, TodoController.getAllTodos);
router.get('/getOne/:id', authenticateToken, TodoController.getTodoById);
router.post('/create', authenticateToken, TodoController.createTodo);
router.put('/update/:id', authenticateToken, TodoController.updateTodo);
router.delete('/delete/:id', authenticateToken, TodoController.deleteTodo);

module.exports = router; 