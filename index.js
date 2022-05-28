// Express
const express = require('express')
const app = express()

// Logging middleware
const morgan = require('morgan')
app.use(morgan('dev'));

// Parsing middleware
app.use(express.json());

// Static Files
app.use(express.static('public'));

// Static Files at a specific route
app.use('/documentation', express.static('public'));

// Add sub routes
app.use('/api', require('./api'));

// PostgreSQL
const client = require('./db/client');
client.connect();

// This destructures the port number from the process.environment variable.
// If none, the default is set to 1337.
// This is not necessary but is required to prevent deployment error with heroku.
const { PORT = 1337 } = process.env;

app.listen(PORT, ()=>{
    console.log("Server is running . . .")
})