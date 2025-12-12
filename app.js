const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const searchRoutes = require('./routes/searchRoutes');
const Movie = require('./models/Movie');

dotenv.config();

const app = express();

// App configuration
app.set('view engine', 'ejs');

// parse form data
app.use(express.urlencoded({extended: true}));

// use static files from the public folder
app.use(express.static('public'));

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log('MongoDB Connected Successfully');
    } catch (e) {
        console.error('MongoDB Connection Error: ', e);
        process.exit(1);
    }
}

connectDB();

// Routes 

// Home route
app.get('/', (req, res) => {
    res.render('index', {title: 'Movie Rating App'});
});

app.use('/search', searchRoutes);

// Route to clear previous ratings
app.get('/clear', async (req, res) => {
    try {
        await Movie.deleteMany({});
        console.log("Database cleared. Ready for new session.");
        res.render('cleared');
    } catch (e) {
        console.error(e);
        res.send("Error clearing database.");
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});