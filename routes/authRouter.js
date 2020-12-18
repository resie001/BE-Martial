
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
const bcrypt = require('bcryptjs');
const userModel = require('../model/User');
var authRouter = express.Router();

// Route untuk authentifikasi
authRouter.route('/login')
    // Method Get tidak supported untuk authentifikasi
    .get((req, res) => {
        res.status(403)
        res.end('Get operation is not supported')
    })
    // Login dengan username dan password
    .post((req, res) => {
        userModel.findOne({ username: req.body.username }).then((user) => {
            bcrypt.compare(req.body.password, user.password, ((err, result) => {
                if (err) {
                    res.status(err.statusCode)
                    res.setHeader('Content-Type', 'application/json')
                    res.json({
                        status: err.statusCode,
                        message: err.message.toString()
                    })
                }
                if (result === true) {
                    var token = jwt.sign({ account: user }, "UK1SbazgQ3yynO3Mg2bgaONSuD5rM0CqIccoUhWqk3NgUqDqQ3GBYCWxZkKsV36z", { expiresIn: 86400 })
                    if (token) {
                        res.status(201)
                        res.setHeader('Content-Type', 'application/json')
                        res.json({
                            status: 201,
                            message: 'Login berhasil',
                            data: {
                                role_id : user.data_id,
                                token :token,
                                role : user.role
                            }
                        })
                    } else {
                        res.status(500)
                        res.setHeader('Content-Type', 'application/json')
                        res.josn({
                            status: 500,
                            message: "Login gagal"
                        })
                    }
                } else {
                    res.status(204)
                    res.setHeader('Content-Type', 'application/json')
                    res.json({
                        status: 204,
                        message: 'Password salah'
                    })
                }

            }))
        }).catch((error) => {
            res.status(204)
            res.setHeader('Content-Type', 'application/json')
            res.json({
                status: error.statusCode,
                message: error.message.toString()
            })
        })
    })
    // Method Put tidak supported untuk authentifikasi
    .put((req, res) => {
        res.status(403)
        res.end('Update operation is not supported')
    })
    // Method Delete tidak supported untuk authentifikasi
    .delete((req, res) => {
        res.status(403)
        res.end('Delete operation is not supported')
    })

module.exports = authRouter;