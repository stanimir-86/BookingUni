const { hasUser } = require('../middlewares/guards.js');
const { getByUserBooking } = require('../services/hotelService.js');

const profileController = require('express').Router()

profileController.get('/', hasUser(), async (req, res) => {
    const bookings = await getByUserBooking(req.user._id);

    res.render('profile', {
        title: 'Profile Page',
        user: Object.assign({ bookings }, req.user)
    })
});

module.exports = profileController;