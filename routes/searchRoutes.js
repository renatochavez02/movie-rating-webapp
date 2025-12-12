const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/Movie');


// GET route, shows the empty search field
router.get('/', (req, res) => {
    const success = req.query.status === 'success';
    res.render('search', { movieData: null, error: null, success: success});
});

// POST route, gets picked up once user clicks "search"
router.post('/', async(req, res) => {
    let title = req.body.title;
    const apiKey = process.env.API_KEY;

    // build OMDb API URL
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // send a 200 OK code if movie was found, and add an error property if needed
        if (data.Error) {
            res.render('search', { movieData: null, error: data.Error, success: null });
        } else {
            res.render('search', { movieData: data, error: null, success: null });
        }
    } catch (e) {
        console.error(e);
        res.render('search', { movieData: null, error: 'Connection to API failed!', success: null });
    }
});

router.post('/rate', async(req, res) => {
    const { title, rating, review } = req.body;

    try {
        await Movie.create({
            title,
            rating,
            review
        });
        res.redirect('/search?status=success');
    } catch (err) {
        console.error(err);
        res.send("Error saving rating.");
    }
})

module.exports = router;