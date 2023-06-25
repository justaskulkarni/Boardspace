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

const { S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")

const s3 = new S3Client({
    
    credentials: {
        accessKeyId : process.env.ACCESS_KEY,
        secretAccessKey : process.env.SECRET_KEY,
    },
    
    region : process.env.BUCKET_REGION
})

const storage = multer.memoryStorage()
const upload = multer({storage : storage})

const router = express.Router()

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

const createToken2 = (otp) => {
    return jwt.sign({ otp }, process.env.SECRET, {
        expiresIn: 10 * 60
    });
}

const createToken3 = (email , note) => {
    return jwt.sign({email , note}, process.env.SECRET, {
        expiresIn: 10 * 60
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
            return res.json({ noverify: "Please complete the signup process before attempting to log in." })
        }

        if (!reqmentor.isverify) {
            return res.json({ noverify: "Your verification is currently pending. Please allow for some time for the verification process to be completed." })
        }

        if (reqmentor.isreject) {
            return res.json({ reject: "Unfortunately, we must inform you that your signup request has been rejected. For further details, please contact us at info@boardspace.in" })
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
                    throw Error("We are pleased to inform you that your email has been verified. Kindly proceed to sign in directly.")
                }
                else if (mexist.isreject) {
                    res.json({ noverify: "Unfortunately, we must inform you that your signup request has been rejected. For further details, please contact us at info@boardspace.in" })
                }
                else if (!mexist.isverify) {
                    res.json({ noverify: "Your verification is currently pending. Please allow for some time for the verification process to be completed." })
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
                            Email: "info@boardspace.in",
                            Name: "Boardspace"
                        },
                        To: [{
                            Email: req.body.email,
                            Name: req.body.name
                        }],
                        Subject: "Welcome to boardspace",
                        HTMLPart: `
                        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #DDBBFF;">
                         <div style="width: 80%; margin: 0 auto; text-align: center; padding-top: 50px;">
                        <h1 style="font-size: 36px; margin-bottom: 20px;">Welcome to Boardspace</h1>
                        <p style="font-size: 24px; margin-bottom: 10px;">Dear ${req.body.name} ,</p>
                        <p style="font-size: 24px; margin-bottom: 10px; color : black;">Thank you for signing up</p>
                        <p style="font-size: 20px;">Here is your OTP: <strong>${genotp}</strong></p>
                        </div>
                        </body>
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
            throw Error('Field cannot be left blank')
        }

        const matchotp = await bcrypt.compare(req.body.otp, reqm.otp)

        if (matchotp) {
            reqm.otp = null
            await reqm.save()
            res.json({ success: true })
        }
        else {
            throw Error('Incorrect OTP')
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


        if (!validator.isStrongPassword(req.body.password,{minLength : 8, minUppercase : 0, minSymbols:0})) {
            throw Error('Password not strong enough')
        }

        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        umentor.password = hashp
        umentor.toparea = req.body.topper
        umentor.otpverified = true

        await umentor.save()

        res.json({ success: true, mssg: "Your verification is currently pending. Please allow for some time for the verification process to be completed." })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/addurl/:email', upload.single('image'), async(req,res) =>{

    try {
        
        const {email} = req.params

        const reqm = await Mentor.findOne({email : email})

        const string = reqm._id + "_" + req.body.field

        const params = {
            Bucket : process.env.BUCKET_NAME,
            Content : req.file.mimetype,
            Key : string,
            Body : req.file.buffer,
            ContentType : 'image/jpeg'
        }

        const command = new PutObjectCommand(params)
        await s3.send(command)

        reqm.idurl.push(string)
        await reqm.save()

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
})

router.post('/images/:id', async(req,res) => {

    try {
        
        const {id} = req.params
        const imagesurl = []
        const reqm = await Mentor.findById(id)

        for(const imagename of reqm.idurl)
        {
            const getObjectParams = {
                Bucket : process.env.BUCKET_NAME,
                Key : imagename,
                ContentType : 'image/jpeg',
            }

            const command = new GetObjectCommand(getObjectParams)
            const url = await getSignedUrl(s3, command, {expiresIn : 3600})
            imagesurl.push(url)
        }

        res.json({urls : imagesurl})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/forgotp', async (req, res) => {

    try {

        if (!req.body.email) {
            throw Error("Please enter an email")
        }

        const reqment = await Mentor.findOne({ email: req.body.email })


        if (reqment) {

            const genotp = otpgen.generate(6, { alphabets: false, upperCase: false, specialChar: false })

            const request = mailjet
                .post('send', { version: 'v3.1' })
                .request({
                    Messages: [{
                        From: {
                            Email: "info@boardspace.in",
                            Name: "Boardspace"
                        },
                        To: [{
                            Email: req.body.email,
                            Name: reqment.name
                        }],
                        Subject: "Request for password change",
                        HTMLPart: `
                        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #DDBBFF;">
                         <div style="width: 80%; margin: 0 auto; text-align: center; padding-top: 50px;">
                        <h1 style="font-size: 36px; margin-bottom: 20px;">OTP for password change</h1>
                        <p style="font-size: 26px;">Here is your OTP: <strong>${genotp}</strong></p>
                        </div>
                        </body>
                        `,
                        TextPart: `Your otp is : ${genotp} `
                    }]
                })

            const token = createToken2(genotp)
            res.json({ success: true, authToken: token })

        }
        else {
            throw Error("Kindly enter a valid email")
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/enterproc' , async(req,res) => {

    try {
        const reqment = await Mentor.findOne({ email: req.body.email })

        if(!reqment)
        {
            throw Error("Invalid email")
        }

        const token = createToken3(req.body.email,"Lethimupdate")
        res.json({success : true , granttoken : token})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/changepass' , async(req,res) =>{

    try {   
    
        if (!validator.isStrongPassword(req.body.pass,{minLength : 8, minUppercase : 0, minSymbols:0})) {
            throw Error('Password not strong enough')
        }

        if (!req.body.pass) {
            throw Error('Kindly enter an password')
        }

        const reqment = await Mentor.findOne({ email: req.body.email })

        const salt = await bcrypt.genSalt(12)
        const hashp = await bcrypt.hash(req.body.pass, salt)

        reqment.password = hashp
        await reqment.save()

        res.json({success : true})  

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;


// const cloudinary = require('cloudinary').v2

// cloudinary.config({
//     cloud_name : process.env.CLOUD_C_NAME,
//     api_key : process.env.CLOUD_KEY,
//     api_secret : process.env.CLOUD_SECRET
// })

// const uploader = multer({
//     storage : multer.diskStorage({}),
//     limits : {fileSize : 500000}
// })

// const rurl = await cloudinary.uploader.upload(req.file.path)
        // console.log(rurl.secure_url)
        // const {email} = req.params

        // const reqm = await Mentor.findOne({email : email})
        
        // reqm.idurl.push(rurl.secure_url)
        // await reqm.save()

        // res.json({success:true})


// app.post('/temp', uploader.single('image'), async(req,res) => {
    
//     const haha = await cloudinary.uploader.upload(req.file.path)

//     console.log(haha.secure_url)
// })