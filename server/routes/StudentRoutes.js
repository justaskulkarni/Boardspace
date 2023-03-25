if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');


const Student = require('../models/student')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const router = express.Router()

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET , {
        expiresIn: 3 * 24 * 60 * 60
    });
}

router.get('/temp',(req,res) =>{
    res.json("hola me student ahe")
})


module.exports = router;