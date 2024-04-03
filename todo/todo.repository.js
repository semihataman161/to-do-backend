const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Todo = sequelize.define('Todo', {
    todo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'todos',
    timestamps: false
});

const createTodo = async ({ user_id, text, checked, time }) => {
    return await Todo.create({ user_id, text, checked, time });
};

const getTodoById = async (todo_id) => {
    return await Todo.findByPk(todo_id);
};

const getAllTodos = async (user_id) => {
    return await Todo.findAll({ where: { user_id } });
};

const updateTodo = async (todo_id, { text, checked }) => {
    return await Todo.update({ text, checked, updated_at: new Date() }, { where: { todo_id } });
};

const deleteTodo = async (todo_id) => {
    return await Todo.destroy({ where: { todo_id } });
};

module.exports = { createTodo, getTodoById, getAllTodos, updateTodo, deleteTodo };