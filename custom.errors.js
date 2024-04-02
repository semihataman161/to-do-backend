class ToDoAppError extends Error {
  constructor(message, options) {
    super(message);
    this.name = this.constructor.name;
    this.options = options;
  }
}

module.exports = { ToDoAppError };
