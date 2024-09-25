const { Router } = require('express');
const cors = require('cors'); // Import cors
const TodoRecord = require('../records/todo.record'); // Correct import
const { pool } = require('../utils/db');

const TodoRouter = Router();

// Use cors middleware
TodoRouter.use(cors());

TodoRouter.get('/', async (req, res) => {
  try {
    const todosList = await TodoRecord.listAll();
    // console.log("successfully got todos.")
    res.send(todosList);
  } catch (error) {
    console.log(error); 
    res.status(500).send('Error fetching todos');
  }
})
  .post('/create', async (req, res) => {
    try {
      const newTodo = new TodoRecord(req.body);
      await newTodo.insert();
      console.log("successfully inserted todo.")
      res.send('Values inserted successfully');
    } catch (error) {
      res.status(500).send('Error creating todo');
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const todo = await TodoRecord.getOne(req.params.id);
      if (todo) {
        await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
        console.log("successfully deleted todo.")
        res.send('Todo deleted successfully');
      } else {
        res.status(404).send('Todo not found');
      }
    } catch (error) {
      res.status(500).send('Error deleting todo');
    }
  });

module.exports = TodoRouter;