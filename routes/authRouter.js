
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const passport = require("passport");

// const authRouter = express.Router();
// authRouter.use(bodyParser.json());

// // auth login
// authRouter.get('/login', (req, res) => {
//     res.render('login', { user: req.user });
// });

// // auth logout
// authRouter.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

// // auth with google+
// authRouter.get('/google', passport.authenticate('google', {
//     scope: ['profile']
// }));

// // callback route for google to redirect to
// // hand control to passport to use code to grab profile info
// authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     // res.send(req.user);
//     res.redirect('/profile');
// });
const bodyParser = require('body-parser');
var express = require('express');
const jwt = require('jsonwebtoken');
var authRouter = express.Router();

authRouter.route('/login')
    .get((req, res) => {
        res.status(403)
        res.end('Get operation is not supported')
    })
    .post((req, res) => {
        
        if (req.body.username === 'admin' && req.body.password === 'admin') {
            var token = jwt.sign({ username: req.body.username, password: req.body.password }, "UK1SbazgQ3yynO3Mg2bgaONSuD5rM0CqIccoUhWqk3NgUqDqQ3GBYCWxZkKsV36z")
            if (token) {
                res.status(201)
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    status: 201,
                    message: 'Login berhasil',
                    data: token
                })
            } else {
                res.status(401)
                res.setHeader('Content-Type', 'application/json')
                res.josn({
                    status: 401,
                    message: "Login gagal"
                })
            }
        } else {
            res.status(404)
            res.setHeader('Content-Type', 'application/json')
            res.josn({
                status: 401,
                message: "username atau password salah"
            })
        }
    })
    .put((req, res) => {
        res.status(403)
        res.end('Update operation is not supported')
    })
    .delete((req, res) => {
        res.status(403)
        res.end('Delete operation is not supported')
    })

module.exports = authRouter;