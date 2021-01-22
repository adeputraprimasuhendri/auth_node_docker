const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
var salt = bcrypt.genSaltSync(10);
var connection = require('../db');
var response;

// READ ALL
router.get('/', async (req, res) => {
    try {
        connection.DB().connect();
        connection.DB().query('SELECT * FROM users ORDER BY id ASC', function (error, results) {
            if (error) {
                response = {
                   status: false,
                   message: error.sqlMessage,
               };
           } else {
                response = {
                   status: true,
                   message:"Success",
                   data: results,
               };
           }
           res.json(response)
        });

    } catch (error) {
        response = {
            status: false,
            message:error.message
        };
        res.json(response)
    }
    
});

// CREATE
router.post('/', async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password, salt)
        if(req.body.password == req.body.confirm_password){
            connection.DB().connect()
            connection.DB().query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
                if (error) {
                     response = {
                        status: false,
                        message: error.sqlMessage,
                    };
                } else {
                     response = {
                        status: true,
                        message:"Created",
                        data: results.insertId,
                    };
                }
                res.json(response)
            })
        }else{
            response = {
                status: false,
                message:"Password not match"
            };
            res.json(response)
        }
    } catch (error) {
        response = {
            status: false,
            message:error.message
        };
        res.json(response)
    }
});

// DELETE
router.delete('/', async (req, res) => {
    try {
        const id = req.body.id
        connection.DB().connect()
        connection.DB().query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                response = {
                   status: false,
                   message: error.sqlMessage,
               };
           } else {
                response = {
                   status: true,
                   message:"Deleted",
               };
           }
           res.json(response)
        })
    } catch (error) {
        response = {
            status: false,
            message:error.message
        };
        res.json(response)
    }
});

// UPDATE
router.patch('/', async (req, res) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        connection.DB().connect()
        connection.DB().query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id],
            (error, results) => {
                if (error) {
                    response = {
                       status: false,
                       message: error.sqlMessage,
                   };
               } else {
                    response = {
                       status: true,
                       message:"Updated"
                   };
               }
               res.json(response)
            }
        )
    } catch (error) {
        response = {
            status: false,
            message:error.message
        };
        res.json(response)
    }

});

module.exports = router;