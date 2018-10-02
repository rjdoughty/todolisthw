// Dependencies
// ===========================================================
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set Port
const PORT = process.env.PORT || 8080;

//Initialize Express
const app = express();


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Connect to the Mongo DB using the database (will be created if it doesn't exist)
//mongoose.connect('mongodb://localhost/tasklist', { useNewUrlParser: true });
mongoose.connect('mongodb://todo:abc123@ds121163.mlab.com:21163/heroku_s8l0bw78', { useNewUrlParser: true });

// Import our routes and pass it 'app' as an argument
require('./routes/routes.js')(app);


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });