const { create } = require('../services/hotelService.js');
const { parseError } = require('../util/parser.js');


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

hotelCotntroller.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id,
    }


    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(hotel);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            title: 'Create Hotel',
            body: hotel,
            errors: parseError(err)
        })
    }
});

hotelCotntroller.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Hotel'
    })
});


module.exports = hotelCotntroller;