const express = require('express');
const knexConfig = require('./knexfile.js');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const db = require('knex')(knexConfig[environment]);
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [newUser] = await db('users').insert({ name, email }).returning('*');
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await db('todos').select('*');
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST a new todo
app.post('/api/todos', async (req, res) => {
  const { task } = req.body;
  try {
    const [newTodo] = await db('todos').insert({ task }).returning('*');
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// PATCH (update) a todo
app.patch('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  try {
    const updatedTask = await db('todos')
      .where('id', id)
      .update({ task, completed })
      .returning('*');

    if (!updatedTask.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db('todos').where('id', id).del();
    if (deleted) {
      res.status(204).send();  // No content on successful deletion
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

