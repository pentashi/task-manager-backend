const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const cors = require('cors');

// Configure CORS
app.use(cors({
  origin: ['https://task-management-ui-blond.vercel.app', 'http://localhost:3001'], // Add more origins if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Get the MongoDB URI and other configurations from environment variables
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Ensure mongoUri is defined
if (!mongoUri) {
  console.error('MongoDB URI is not defined in the .env file');
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
