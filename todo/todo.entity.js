/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - text
 *         - checked
 *         - time
 *       properties:
 *         text:
 *           type: string
 *           description: The todo text
 *         checked:
 *           type: boolean
 *           description: The todo status
 *         time:
 *           type: string
 *           format: date-time
 *           description: The time when the todo was created
 *       example:
 *         text: 'Complete assignment'
 *         checked: false
 *         time: '2024-04-05T12:00:00Z'
 */

class Todo {
    constructor(text, checked, time) {
        this.text = text;
        this.checked = checked;
        this.time = time;
    }
}

module.exports = Todo;  