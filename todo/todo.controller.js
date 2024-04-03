const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const TodoService = require('./todo.service');

const todoSchema = Joi.object({
    text: Joi.string().required(),
    checked: Joi.boolean().required(),
    time: Joi.date().iso().required()
});

const getAllTodos = asyncHandler(async (req, res, next) => {
    const user_id = req.user.user_id;
    const todos = await TodoService.getAllTodos(user_id);
    res.status(200).json(todos);
});

const getTodoById = asyncHandler(async (req, res, next) => {
    const { todo_id } = req.params;
    const todo = await TodoService.getTodoById(todo_id);
    res.status(200).json(todo);
});

const createTodo = asyncHandler(async (req, res, next) => {
    const { error } = todoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const user_id = req.user.user_id;
    const { text, checked, time } = req.body;
    await TodoService.createTodo({ user_id, text, checked, time });
    res.status(200).json({ message: 'Todo created successfully.' });
});

const updateTodo = asyncHandler(async (req, res, next) => {
    const { todo_id } = req.params;
    const { error } = todoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    await TodoService.updateTodo(todo_id, req.body);
    res.status(200).json({ message: 'Todo updated successfully.' });
});

const deleteTodo = asyncHandler(async (req, res, next) => {
    const { todo_id } = req.params;
    await TodoService.deleteTodo(todo_id);
    res.status(200).json({ message: 'Todo deleted successfully.' });
});

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };