const TodoRepository = require('./todo.repository');

const createTodo = async ({ user_id, text, checked, time }) => {
    return await TodoRepository.createTodo({ user_id, text, checked, time });
};

const getTodoById = async (todo_id) => {
    return await TodoRepository.getTodoById(todo_id);
};

const getAllTodos = async (user_id) => {
    return await TodoRepository.getAllTodos(user_id);
};

const updateTodo = async (todo_id, { text, checked }) => {
    return await TodoRepository.updateTodo(todo_id, { text, checked });
};

const deleteTodo = async (todo_id) => {
    return await TodoRepository.deleteTodo(todo_id);
};

module.exports = { createTodo, getTodoById, getAllTodos, updateTodo, deleteTodo };