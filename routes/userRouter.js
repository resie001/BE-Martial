const express = require('express');
const bodyParser = require("body-parser");
const userRouter = express.Router();
const userRegister = require('../config/auth');
userRouter.use(bodyParser.json());


//Users Registration Route
userRouter.post('/register-user', async (req, res) => {
    await userRegister(req.body, "pasien", res);
});

//Dokter Registration Route
userRouter.post('/register-dokter', async (req, res) => {
    await userRegister(req.body, "dokter", res);
});

//Super Admin Registration Route
userRouter.post('/register-admin', async (req, res) => {
    await userRegister(req.body, 'superadmin', res);
});

//Users Login Route
userRouter.post('/login-user', async (req, res) => {});

//Dokter Login Route
userRouter.post('/login-dokter', async (req, res) => {});

//Super Admin Login Route
userRouter.post('/login-admin', async (req, res) => {});

//Users Protected Route
userRouter.post('/user-profile', async (req, res) => {});

//Profile Route
userRouter.get('profile', async(req, res) => {});

//Dokter Protected Route
userRouter.post('/dokter-profile', async (req, res) => {});

//Super Admin Protected Route
userRouter.post('/dokter-profile', async (req, res) => {});

module.exports = userRouter;
