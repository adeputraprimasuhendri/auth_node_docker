const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
var connection = require('../db');
var response;
var status_code;
var token;
var exp = 60 * 60;

// Login
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password;

        connection.DB().connect()
        connection.DB().query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                response = {
                    status: false,
                    message: error.sqlMessage,
                };
                status_code = 500;
                res.status(status_code).json(response)
            } else {
                if (results.length > 0) {
                    results.forEach(item => {
                        bcrypt.compare(password, item.password, function (err, result) {
                            if (err) {
                                response = {
                                    status: false,
                                    message: err.message,
                                };
                                status_code = 500;
                                res.status(status_code).json(response)
                            }
                            if (result) {
                                token = jwt.sign({
                                    id: item.id,
                                    email: item.email,
                                    name: item.name,
                                }, 'secret', { expiresIn: exp });
                                response = {
                                    status: true,
                                    message: "Bearer Token",
                                    token: token,
                                    expiresIn: exp
                                };
                                status_code = 200;
                                res.status(status_code).json(response)
                            } else {
                                response = {
                                    status: false,
                                    message: "Wrong password"
                                };
                                status_code = 401;
                                res.status(status_code).json(response)
                            }
                        })
                    })
                } else {
                    response = {
                        status: false,
                        message: "Email not registered"
                    };
                    status_code = 401
                    res.status(status_code).json(response)
                }
            }
        })
    } catch (error) {
        response = {
            status: false,
            message: error.message
        };
        status_code = 500
        res.status(status_code).json(response)
    }
});


// Verify
router.get('/verify', async (req, res) => {
    try {
        token = req.headers['authorization'].split(' ')
        var result = jwt.verify(token[1], 'secret');
        response = {
            status: true,
            message: "Authorized",
            data: result
        };
        status_code = 200
        res.status(status_code).json(response)

    } catch (error) {
        response = {
            status: false,
            message: error.message
        };
        status_code = 401
        res.status(status_code).json(response)
    }
});


module.exports = router;