const hotelCotntroller = require('express').Router();

hotelCotntroller.get('/:id/details', (req, res) => {
    res.render('details', {
        title: 'Hotel Details'
    });
});

hotelCotntroller.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel'
    })
});

hotelCotntroller.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Hotel'
    })
});


module.exports = hotelCotntroller;