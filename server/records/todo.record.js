const { v4: uuid } = require('uuid');
const { pool } = require('../utils/db');

class TodoRecord {
  constructor(obj) {
    if (!obj.todo || obj.todo.length < 3 || obj.todo.length > 50) {
      throw new Error(
        'Todo must have at least 3 characters and less than 50 characters'
      );
    }

    this.id = obj.id;
    this.todo = obj.todo;
  }

  static async listAll() {
    const { rows } = await pool.query('SELECT * FROM todos');
    return rows.map((obj) => new TodoRecord(obj));
  }

  static async getOne(id) {
    const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    return rows.length === 0 ? null : new TodoRecord(rows[0]);
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.query('INSERT INTO todos (id, todo) VALUES ($1, $2)', [
      this.id,
      this.todo,
    ]);

    return this.id;
  }

  async update(id, todo) {
    await pool.query('UPDATE todos SET todo = $1 WHERE id = $2', [todo, id]);
  }
}

module.exports = TodoRecord;