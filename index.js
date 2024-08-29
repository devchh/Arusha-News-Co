require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//To initialise the express app:
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware (which is where all the functions have access to the request object, the response obkect and the next middelware function in the app's request-response cycel. )
app.use(cors()); //Should enable CORS
app.use(bodyParser.json()); //Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Import routes
const articleRoutes = require('./routes/articles');
app.use('/api', articleRoutes);

// Redirect root URL to index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});