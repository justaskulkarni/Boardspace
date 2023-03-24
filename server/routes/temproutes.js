if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const User = require('../models/user')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const router = express.Router()

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env,SECRET , {
//         expiresIn: 3 * 24 * 60 * 60
//     });
// }

router.post('/login', async (req, res) => {

    try {

        if (!req.body.email || !req.body.password) {
            throw Error('All fields must be filled')
        }

        const requser = await User.findOne({ email: req.body.email })

        if (!requser) {
            throw Error('Incorrect Email')
        }

        const match = await bcrypt.compare(req.body.password, requser.password)

        if (!match) {
            throw Error('Password is incorrect')
        }
        else {
            // const token = createToken(requser._id)
            // res.json({token})
            res.json({ success: true })
        }


    } catch (error) {
        res.json({ mssg: error.message })
    }


})

router.post('/signup', async (req, res) => {

    try {
        if (!req.body.email || !req.body.password) {
            throw Error('All fields must be filled')
        }

        if (!validator.isEmail(req.body.email)) {
            throw Error('Email not valid')
        }

        if (!validator.isStrongPassword(req.body.password)) {
            throw Error('Password not strong enough')
        }


        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        const newUser = new User({

            email: req.body.email,
            password: hashp
        })

        await newUser.save()

        // const token = createToken(newUser._id)

        res.json({ success: true })

    } catch (error) {
        res.json({ error: error.message })
    }
})

module.exports = router;