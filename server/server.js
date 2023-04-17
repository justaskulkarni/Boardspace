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
const Message = require('./models/message')

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

async function getMessagesFromRoom(currentRoom){
  let roomMessages = await Message.aggregate([
    {$match: {to: currentRoom}},
    {$lookup: {
      from: "students", // Replace with the name of the Student collection
      localField: "from",
      foreignField: "_id",
      as: "fromStudent"
    }},
    {$addFields: {from: {$arrayElemAt: ["$fromStudent.stname", 0]}}},
    {$project: {fromStudent: 0}} // Exclude fromStudent field from the final output
  ]);
  return roomMessages;
}



io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("send-message", async(currentMessage, time, date, role, currentRoom, userId) => {
        try{
            console.log(currentMessage, time, date, role, currentRoom, userId)
            const user = await Student.findById(userId);

            if (!user) {
                console.log("User not found");
                return;
            }
            const newMessage = new Message({
                content: currentMessage,
                time: time,
                date: date,
                role: role,
                to: currentRoom,
                from: user._id 
            });
            await newMessage.save();
            console.log("Message saved:", newMessage);
            let roomMessages = await getMessagesFromRoom(currentRoom);
            console.log(roomMessages)
            io.emit('room-messages', roomMessages);
        }
        catch(error){
            console.log(error)
        }
        
    })

    /* socket.on("join-room", room => {
        socket.join(room)
        console.log(room)
        socket.emit('room-messages', "mai idhar hu")
    }) */
})

// app.post('/temp', uploader.single('image'), async(req,res) => {
    
//     const haha = await cloudinary.uploader.upload(req.file.path)

//     console.log(haha.secure_url)
// })

server.listen(MYPORT, () => {
    console.log(`Ready to serve you master on ${MYPORT}`)
})