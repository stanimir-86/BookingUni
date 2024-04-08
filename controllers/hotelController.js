const { create, getById, update, deleteById, bookRoom } = require('../services/hotelService.js');
const { parseError } = require('../util/parser.js');


const hotelCotntroller = require('express').Router();

hotelCotntroller.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id);
    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
    } else if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true;
    }

    res.render('details', {
        title: 'Hotel Details',
        hotel
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

hotelCotntroller.get('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    res.render('edit', {
        title: 'Edit Hotel',
        hotel
    })
});

hotelCotntroller.post('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    const edited = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
    }
    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await update(req.params.id, edited);
        res.redirect(`/hotel/${req.params.id}/details`);
    } catch (err) {
        res.render('edit', {
            title: 'Edit Hotel',
            hotel: Object.assign(edited, { _id: req.params.id }),
            errors: parseError(err)

        })

    }

});
hotelCotntroller.get('/:id/delete', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    await deleteById(req.params.id);
    res.redirect('/');
});

hotelCotntroller.get('/:id/book', async (req, res) => {
    const hotel = await getById(req.params.id);
    try {
        if (hotel.owner == req.user._id) {
            hotel.isOwner = true;
            throw new Error('Connot book your own hotel')
        }
        await bookRoom(req.params.id, req.user._id);
        res.redirect(`/hotel/${req.params.id}/details`);
    } catch (err) {
        res.render('details', {
            title: 'Hotel Details',
            hotel,
            errors: parseError(err),
        });
    }

});

module.exports = hotelCotntroller;