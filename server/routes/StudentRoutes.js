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

router.post('/login', async (req, res) => {

    try {

        if (!req.body.email || !req.body.password) {
            throw Error('All fields must be filled')
        }

        const reqstud = await Student.findOne({ email: req.body.email })

        if (!reqstud) {
            throw Error('Incorrect Email')
        }

        const match = await bcrypt.compare(req.body.password, reqstud.password)

        if (!match) {
            throw Error('Password is incorrect')
        }
        else {
            const token = createToken(reqstud._id)
            res.json({ success: true, authToken: token })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

router.post('/signup', async (req, res) => {

    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.phonenum) {
            throw Error('All fields must be filled')
        }

        if(!validator.isEmail(req.body.email)){
            throw Error('Enter a valid number')
        }

        if (!validator.isStrongPassword(req.body.password)) {
            throw Error('Password not strong enough')
        }

        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        const newStud = new Student({
            email : req.body.email,
            password : hashp,
            phonenum : req.body.phonenum,
            stname : req.body.name
        })

        await newStud.save()

        const token = createToken(newStud._id)
        res.json({ success: true, authToken: token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


module.exports = router;