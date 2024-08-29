const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');
// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority } = req.body; // Include priority
  const userId = req.user.userId;

  try {
    const newTask = new Task({ title, description, dueDate, priority, user: userId }); // Save priority
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate, priority } = req.body; // Include priority
  const userId = req.user.userId;

  try {
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority; // Update priority

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
