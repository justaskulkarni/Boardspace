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

const multer = require('multer')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name : process.env.CLOUD_C_NAME,
    api_key : process.env.CLOUD_KEY,
    api_secret : process.env.CLOUD_SECRET
})

const uploader = multer({
    storage : multer.diskStorage({}),
    limits : {fileSize : 500000}
})

const router = express.Router()

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET, {
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

        if (!reqmentor.otpverified) {
            res.json({ noverify: "Kindly complete the signup proceddure before loggin in" })
        }

        if (!reqmentor.isverify) {
            res.json({ noverify: "Tumhi verify nahi jhale ahe balak thoda time ruka" })
        }

        if (reqmentor.isreject) {
            res.json({ reject: "Tumcha request delete jhala ahe bethu ya kadhi tari" })
        }

        const match = await bcrypt.compare(req.body.password, reqmentor.password)

        if (!match) {
            throw Error('Password is incorrect')
        }
        else if(match && reqmentor.isverify) {
            const token = createToken(reqmentor._id, "Mentor")
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

        const salt = await bcrypt.genSalt(12)
        const hashotp = await bcrypt.hash(genotp, salt);

        var bhejootp = false

        const mexist = await Mentor.findOne({ email: req.body.email })
        if (mexist) {
            if (mexist.otpverified) {
                if (mexist.isverify) {
                    const token = createToken(mexist._id, "Mentor")
                    res.json({ isOtpVerified: true, authToken: token })
                }
                else if (mexist.isreject) {
                    res.json({ noverify: "Your request is rejected contact admin" })
                }
                else if (!mexist.isverify) {
                    res.json({ noverify: "Have patience we have got everything" })
                }
            }
            else {
                bhejootp = true
                mexist.otp = hashotp
                await mexist.save()
                res.json({ success: true })
            }
        }
        else {

            bhejootp = true
            const newMentor = new Mentor({
                email: req.body.email,
                otp: hashotp,
                name: req.body.name
            })

            await newMentor.save()

            res.json({ success: true })
        }

        if (bhejootp) {
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
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/verifyotp', async (req, res) => {

    try {

        const reqm = await Mentor.findOne({ email: req.body.email })

        if (!req.body.otp) {
            throw Error('Enter a OTP')
        }

        const matchotp = await bcrypt.compare(req.body.otp, reqm.otp)

        if (matchotp) {
            reqm.otp = null
            await reqm.save()
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

        const umentor = await Mentor.findOne({ email: req.body.email })

        if (!req.body.password) {
            throw Error('All fields must be filled')
        }


        if (!validator.isStrongPassword(req.body.password)) {
            throw Error('Password not strong enough')
        }

        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        umentor.password = hashp
        umentor.toparea = req.body.topper
        umentor.otpverified = true

        await umentor.save()

        res.json({ success: true, mssg: "You have succesfully completed eveyrhting kindly wait till we verify you ohk" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/addurl/:email', uploader.single('image'), async(req,res) =>{

    try {
        console.log("hi")
        const rurl = await cloudinary.uploader.upload(req.file.path)
        console.log(rurl)
        // const {email} = req.params

        // const reqm = await Mentor.findOne({email : email})
        
        // reqm.idurl.push(req.body.url)
        // await reqm.save();
        // console.log(reqm)
        // console.log("Saved sir", req.body.url)
        // res.json({success:true})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
})

module.exports = router;