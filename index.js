const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const PORT = 5000;

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/distress', require('./routes/distress'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/', (req, res) => {
  res.send("Hello World");
})
