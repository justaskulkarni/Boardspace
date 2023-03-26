if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

const Mentor = require('../models/mentor')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const otpgen = require('otp-generators')
const Mailjet = require('node-mailjet')

const router = express.Router()

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

const mailjet = new Mailjet.apiConnect(process.env.MJ_PUBLIC, process.env.MJ_SECRET)

router.post('/login', async (req, res) => {

    try {

        if (!req.body.email || !req.body.password) {
            throw Error('All fields must be filled')
        }

        const reqmentor = await Mentor.findOne({ email: req.body.email })

        if (!reqmentor) {
            throw Error('Incorrect Email')
        }

        const match = await bcrypt.compare(req.body.password, reqmentor.password)

        if (!match) {
            throw Error('Password is incorrect')
        }
        else {
            const token = createToken(reqmentor._id)
            res.json({ success: true, authToken: token })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

router.post('/semisignup', async (req, res) => {

    try {

        if (!validator.isEmail(req.body.email)) {
            throw Error('Email not valid')
        }

        if (!req.body.email || !req.body.name) {
            throw Error('All fields must be filled')
        }

        const genotp = otpgen.generate(6, { alphabets: false, upperCase: false, specialChar: false })

        const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [{
                    From: {
                        Email: "bahetisid06@gmail.com",
                        Name: "Siddhant"
                    },
                    To: [{
                        Email: req.body.email,
                        Name: req.body.name
                    }],
                    Subject: "Welcome to boardspace",
                    HTMLPart: `
            <div>
                <h1>Welcome ${req.body.name}</h1>
                <h3>This is your otp</h3>
                <h3>${genotp}</h3>
            </div>
            `,
                    TextPart: `Dear ${req.body.name} your otp is : ${genotp} `
                }]
            })

        const mexist = await Mentor.findOne({ email: req.body.email })
        if (mexist) {
            mexist.otp = genotp
            await mexist.save()

            res.json({ success: true })
        }
        else {

            const newMentor = new Mentor({
                email: req.body.email,
                otp: genotp,
                name: req.body.name
            })

            await newMentor.save()

            res.json({ success: true })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/verifyotp', async (req, res) => {

    try {

        const reqm = await Mentor.findOne({ email: req.body.email })

        if (!req.body.otp) {
            throw Error('Enter a valid OTP')
        }

        if (reqm.otp == req.body.otp) {
            res.json({ success: true })
        }
        else {
            throw Error('Enter a valid OTP')
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/signup', async (req, res) => {

    try {
        if (!req.body.idurl || !req.body.password) {
            throw Error('All fields must be filled')
        }


        if (!validator.isStrongPassword(req.body.password)) {
            throw Error('Password not strong enough')
        }

        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        const umentor = await Mentor.findOne({email : req.body.email})

        umentor.password = hashp
        umentor.idurl = req.body.idurl
        
        await umentor.save()

        const token = createToken(umentor._id)
        res.json({ success: true, authToken: token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;