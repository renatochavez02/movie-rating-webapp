const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// App configuration
app.set('view engine', 'ejs');

// parse form data
app.use(express.urlencoded({extended: true}));

// use static files from the public folder
app.use(express.static('public'));

// Database connection (Placeholder)

// Routes 

// Home route
app.get('/', (req, res) => {
    res.render('index', {title: 'Movie Rating App'});
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});