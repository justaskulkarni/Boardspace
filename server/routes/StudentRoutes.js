if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');


const Student = require('../models/student')
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

        if (!validator.isStrongPassword(req.body.password)) {
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

module.exports = router;