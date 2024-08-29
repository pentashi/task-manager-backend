const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'pending' }, // Example statuses: pending, in-progress, completed
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' // Default priority
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
