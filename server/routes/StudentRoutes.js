if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

const Student = require('../models/student')
const Notification = require('../models/notification')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken');
const otpgen = require('otp-generators')
const Mailjet = require('node-mailjet')

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

        const reqstud = await Student.findOne({ email: req.body.email })

        if (!reqstud) {
            throw Error('Incorrect Email')
        }

        const match = await bcrypt.compare(req.body.password, reqstud.password)

        if (!match) {
            throw Error('Password is incorrect')
        }
        else {
            const token = createToken(reqstud._id, "Student")
            res.json({ success: true, authToken: token })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

router.post('/signup', async (req, res) => {

    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            throw Error('All fields must be filled')
        }

        if (!validator.isEmail(req.body.email)) {
            throw Error('Enter a valid number')
        }

        if (!validator.isStrongPassword(req.body.password,{minLength : 8, minUppercase : 0, minSymbols:0})) {
            throw Error('Password not strong enough')
        }

        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        const newStud = new Student({
            email: req.body.email,
            password: hashp,
            phonenum: req.body.phonenum,
            stname: req.body.name
        })

        await newStud.save()

        const token = createToken(newStud._id, "Student")
        res.json({ success: true, authToken: token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const getNotificationsCount = async (studentId) => {
    try {
        const notificationsCount = await Notification.countDocuments({ senderId: studentId, role: 'Student' });
        return notificationsCount;
    } catch (error) {
        return 0;
    }
};

router.get('/allstud', async (req, res) => {
    try {
        Student.find({}, async (err, data) => {
            if (err) {
                throw Error(`${err}`)
            }
            else {

                const studentsWithNotifications = await Promise.all(data.map(async (student) => {
                    const notificationsCount = await getNotificationsCount(student._id);
                    return { ...student.toObject(), notifications: notificationsCount };
                }));
                res.json({ success: true, data: data, notifs: studentsWithNotifications });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/dets/:id', async (req, res) => {

    const { id } = req.params

    try {

        const reqstudent = await Student.findById(id)

        res.json({ success: true, studentdets: reqstudent })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/forgotp', async (req, res) => {

    try {

        if (!req.body.email) {
            throw Error("Please enter an email")
        }

        const reqstud = await Student.findOne({ email: req.body.email })


        if (reqstud) {

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
                            Name: reqstud.stname
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
        const reqstud = await Student.findOne({ email: req.body.email })

        if(!reqstud)
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

        const reqstud = await Student.findOne({ email: req.body.email })

        const salt = await bcrypt.genSalt(12)
        const hashp = await bcrypt.hash(req.body.pass, salt)

        reqstud.password = hashp
        await reqstud.save()

        res.json({success : true})  

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;