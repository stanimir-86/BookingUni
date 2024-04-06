const authController = require('express').Router();
const { register, login } = require('../services/userService.js');
const { parseError } = require('../util/parser.js');



authController.get('/register', (req, res) => {

    //TODO replace with actual view by assigment
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords dont match')
        }
        const token = await register(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/');//TODO replace with redirect by assigment

    } catch (error) {
        console.log(error);
        const errors = parseError(error);

        //TODO add error display to actual template from assigment
        res.render('register', {
            title: 'Register page',
            errors,
            body: {
                username: req.body.username
            }
        });

    }
});

authController.get('/login', (req, res) => {
    res.render('login', {
        title: "Login page"
    });
});
authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/')//TODO replace with redirect by assigment
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;