const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const cors = require('cors');

// Middleware
app.use(cors({
  origin: 'http://localhost:3001/', // Allow requests from this origin (frontend URL)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow all HTTP methods
  credentials: true // Allow credentials (e.g., cookies, authorization headers)
}));
app.use(express.json());

// Handle preflight requests (OPTIONS)
app.options('*', cors());

// Manually adding CORS headers (if needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001/'); // Allow requests from this origin
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE'); // Allow specific HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow specific headers
  next();
});

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
