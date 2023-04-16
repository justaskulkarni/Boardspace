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
const Student = require('./models/student');

app.use('/api/mentor/', mentorroutes)
app.use('/api/student/', studentroutes)
app.use('/api/admin/', adminroutes)

const server = require('http').createServer(app)
const MYPORT = process.env.PORT || 6100

const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  })

const DB_URL = process.env.MONGO_URL
mongoose.connect(DB_URL)
    .then(() => console.log('Mongoup'))
    .catch(e => console.log(e))


app.get('/', (req, res) => {
    res.send("Welcome to home page sir")
})

app.get('/getnums' , async (req,res) => {

    try {
        
        const allmentors = await Mentor.count()
        const allstudents = await Student.count({})
        res.json({success : true, mentors : allmentors, stud : allstudents})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
})

let message = ""

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("send-message", (message,room) => {
        io.to(room).emit("receive-message", message)
    })

    socket.on("join-room", room => {
        socket.join(room)
        console.log(room)
    })
})

// app.post('/temp', uploader.single('image'), async(req,res) => {
    
//     const haha = await cloudinary.uploader.upload(req.file.path)

//     console.log(haha.secure_url)
// })

server.listen(MYPORT, () => {
    console.log(`Ready to serve you master on ${MYPORT}`)
})