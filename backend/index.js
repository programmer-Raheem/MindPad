const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Use environment PORT (for Render) or fallback to 5000 (local)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 MindPad backend running on port ${PORT}`);
});
