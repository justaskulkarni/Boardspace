if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

const Admin = require('../models/admin')

const router = express.Router()

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET , {
        expiresIn: 3 * 24 * 60 * 60
    });
}

router.get('/temp', (req,res) =>{
    res.json("hola tumhi admin ahe")
})


module.exports = router;