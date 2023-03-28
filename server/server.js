if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


const mentorroutes = require('./routes/MentorRoutes')
const studentroutes = require('./routes/StudentRoutes')
const adminroutes = require('./routes/AdminRoutes')

const Mentor = require('./models/mentor')
const Student = require('./models/student')
const Admin = require('./models/admin')

app.use('/api/mentor/', mentorroutes)
app.use('/api/student/', studentroutes)
app.use('/api/admin/', adminroutes)

const DB_URL = process.env.MONGO_URL
mongoose.connect(DB_URL)
    .then(() => console.log('Mongoup'))
    .catch(e => console.log(e))


app.get('/', (req, res) => {
    res.send("Welcome to home page sir")
})

app.post('/isMentor', (req, res) => {

    const token = req.body.token

    jwt.verify(token, process.env.SECRET, async (err, decocdedToken) => {
        if (err) {
            res.json({ success: false })
        }
        else {
            const match = await Mentor.findById(decocdedToken.id)
            console.log("Match is", match)

            if (match) {
                console.log(decocdedToken.id)
                res.json({ success: true })
            }
            else {
                res.json({ success: false })
            }
        }
    })
})

app.post('/isStudent', (req, res) => {

    const token = req.body.token

    jwt.verify(token, process.env.SECRET, async (err, decocdedToken) => {
        if (err) {
            res.json({ success: false })
        }
        else {
            const match = Student.findById(decocdedToken.id)

            if (match) {
                res.json({ success: true })
            }
            else {
                res.json({ success: false })
            }
        }
    })
})

app.post('/isAdmin', (req, res) => {

    const token = req.body.token

    jwt.verify(token, process.env.SECRET, async (err, decocdedToken) => {
        if (err) {
            res.json({ success: false })
        }
        else {
            const match = Admin.findById(decocdedToken.id)

            if (match) {
                res.json({ success: true })
            }
            else {
                res.json({ success: false })
            }
        }
    })
})

const MYPORT = process.env.PORT || 6100

app.listen(MYPORT, () => {
    console.log(`Ready to serve you master on ${MYPORT}`)
})