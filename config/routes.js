const authController = require("../controllers/authController.js");
const homeController = require("../controllers/homeController.js");
const hotelCotntroller = require("../controllers/hotelController.js");
const profileController = require("../controllers/profileController.js");

module.exports = (app) => {

    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/hotel', hotelCotntroller);
    app.use('/profile', profileController)
};