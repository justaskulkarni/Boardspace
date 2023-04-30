if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

const Admin = require('../models/admin')
const Mentor = require('../models/mentor')
const Notification = require('../models/notification')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const router = express.Router()

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

router.post('/login', async (req, res) => {

    try {

        if (!req.body.email || !req.body.password) {
            throw Error('All fields must be filled')
        }

        const reqadmin = await Admin.findOne({ email: req.body.email })

        if (!reqadmin) {
            throw Error('Incorrect Email')
        }

        const match = await bcrypt.compare(req.body.password, reqadmin.password)

        if (!match) {
            throw Error('Password is incorrect')
        }
        else {
            const token = createToken(reqadmin._id, "Admin")
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

        if (!validator.isStrongPassword(req.body.password)) {
            throw Error('Password not strong enough')
        }

        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        const newAdmin = new Admin({
            email: req.body.email,
            password: hashp,
            username: req.body.name
        })

        await newAdmin.save()

        const token = createToken(newAdmin._id, "Admin")
        res.json({ success: true, authToken: token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/getall', async (req, res) => {

    try {
        Mentor.find({ otpverified: true, isverify: false, isreject: false }, async (err, data) => {
            if (err) {
                throw Error(`${err}`)
            }
            else {
                res.json({ success: true, data: data })
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/verify/mentor/:id', async (req, res) => {

    const { id } = req.params

    try {

        const reqmentor = await Mentor.findById(id)

        reqmentor.isverify = true;
        await reqmentor.save()

        res.json({ success: true })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/mentor/dets/:id', async (req, res) => {

    const { id } = req.params

    try {

        const reqmentor = await Mentor.findById(id)

        res.json({ success: true, mentdets: reqmentor })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/reject/mentor/:id', async (req, res) => {

    const { id } = req.params

    try {

        const reqmentor = await Mentor.findById(id)

        reqmentor.isreject = true
        reqmentor.isverify = false
        reqmentor.rejectreason = req.body.reason
        await reqmentor.save()

        res.json({ success: true })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/get/rejected', async (req, res) => {

    try {
        Mentor.find({ otpverified: true, isverify: false, isreject: true }, async (err, data) => {
            if (err) {
                throw Error(`${err}`)
            }
            else {
                res.json({ success: true, data: data })
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }    
})

router.post('/confirm/delete/:id', async (req,res) => {
    try {
        
        const {id} = req.params

        await Mentor.findByIdAndDelete(id)

        res.json({success:true})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/mentor/undo/:id', async (req,res) => {
    try {
        
        const {id} = req.params

        const reqmentor = await Mentor.findById(id)

        reqmentor.isreject = false
        reqmentor.rejectreason = ""
        await reqmentor.save()

        res.json({success:true})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const getNotificationsCount = async (mentorId) => {
  try {
    const notificationsCount = await Notification.countDocuments({ senderId: mentorId, role: 'Mentor' });
    return notificationsCount;
  } catch (error) {
    return 0;
  }
};

router.get('/get/acceptednotifications', async (req, res) => {

    try {
        Mentor.find({ otpverified: true, isverify: true, isreject: false }, async (err, data) => {
            if (err) {
                throw Error(`${err}`)
            }
            else {
                const mentorsWithNotifications = await Promise.all(data.map(async (mentor) => {
                    const notificationsCount = await getNotificationsCount(mentor._id);
                    return { ...mentor.toObject(), notifications: notificationsCount };
                }));
                res.json({ success: true, data: data, notifs: mentorsWithNotifications });
                
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }    
})

router.get('/get/accepted', async (req, res) => {

    try {
        Mentor.find({ otpverified: true, isverify: true, isreject: false }, async (err, data) => {
            if (err) {
                throw Error(`${err}`)
            }
            else {
                res.json({ success: true, data: data })
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }    
})

module.exports = router;