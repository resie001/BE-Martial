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
                res.json(token)
            } else {
                res.status(201)
                res.end('Login gagal')
            }
        } else {
            res.status(404)
            res.end("username atau password salah")
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