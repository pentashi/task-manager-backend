const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const cors = require('cors');

// Configure CORS
app.use(cors({
  origin: 'https://task-management-ui-blond.vercel.app', // Allow requests from this origin (frontend URL)
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allow all HTTP methods
  credentials: true // Allow credentials (e.g., cookies, authorization headers)
}));

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Get the MongoDB URI and other configurations from environment variables
const mongoUri = process.env.MONGO_URI;

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
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
