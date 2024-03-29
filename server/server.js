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
const chatroutes = require('./routes/ChatRoutes')
const postroutes = require('./routes/PostRoutes')
const commentroutes = require('./routes/CommentRoutes')

const Mentor = require('./models/mentor')
const Student = require('./models/student')
const Message = require('./models/message')
const Admin = require('./models/admin')
const Notification = require('./models/notification')
const Post = require('./models/post')
const Comment = require('./models/comment')

app.use('/api/mentor/', mentorroutes)
app.use('/api/student/', studentroutes)
app.use('/api/admin/', adminroutes)
app.use('/api/chat', chatroutes)
app.use('/api/post', postroutes)
app.use('/api/comment', commentroutes)

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

app.get('/gethomepagenums', async(req, res) =>{
  try {
        
        const jeetoppers = await Mentor.countDocuments({
          toparea: { $in: ['JEE Topper'] }
        });
        const boardtoppers = await Mentor.countDocuments({
          toparea: { $in: ['Board Topper'] }
        });
        const communitymembers = await Student.count({})
        const neettoppers = await Mentor.countDocuments({
          toparea: { $in: ['Neet Topper'] }
        });
        res.json({success : true, jeetoppers : jeetoppers, boardtoppers : boardtoppers, communitymembers: communitymembers, neettoppers: neettoppers})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
 
async function getMessagesFromRoom(currentRoom) {
  let roomMessages = await Message.aggregate([
    {
      $match: { to: currentRoom },
    },
    {
      $lookup: {
        from: "students",
        localField: "fromid",
        foreignField: "_id",
        as: "fromStudent",
      },
    },
    {
      $lookup: {
        from: "mentors",
        localField: "fromid",
        foreignField: "_id",
        as: "fromMentor",
      },
    },
    {
      $lookup: {
        from: "admins",
        localField: "fromid",
        foreignField: "_id",
        as: "fromAdmin",
      },
    },
    {
      $facet: {
        students: [
          {
            $match: {
              fromrole: "Student",
            },
          },
          {
            $addFields: {
              from: {
                $arrayElemAt: ["$fromStudent.stname", 0],
              },
            },
          },
          {
            $project: {
              fromStudent: 0,
              fromMentor: 0,
              fromAdmin: 0,
            },
          },
        ],
        mentors: [
          {
            $match: {
              fromrole: "Mentor",
            },
          },
          {
            $addFields: {
              from: {
                $arrayElemAt: ["$fromMentor.name", 0],                
              },
              toparea: {
                $arrayElemAt: ["$fromMentor.toparea", 0],                
              },
            },
          },
          {
            $project: {
              fromStudent: 0,
              fromMentor: 0,
              fromAdmin: 0,
            },
          },
        ],
        admins: [
          {
            $match: {
              fromrole: "Admin",
            },
          },
          {
            $addFields: {
              from: {
                $arrayElemAt: ["$fromAdmin.username", 0],
              },
            },
          },
          {
            $project: {
              fromStudent: 0,
              fromMentor: 0,
              fromAdmin: 0,
            },
          },
        ],
      },
    },
  ]);
  return roomMessages;
}


io.on("connection", (socket) => {

    socket.on("join-room", async(prevroom,room, role) => {
        await socket.leave(prevroom)
        await socket.join(room)
        
        if(room.includes('admin') && role === 'Admin'){
          Notification.deleteMany({ to: room }, (err) => {
            if (err) {
              console.log(err);
            } 
          });
        }
    })

    socket.on("join-one", async(room, role) => {
        await socket.join(room)
        
        if(room.includes('admin') && role === 'Admin'){
          Notification.deleteMany({ to: room }, (err) => {
            if (err) {
              console.log(err);
            } 
            
          });
        }
    })

    socket.on("send-room", async(room,message,role,id, senderName, fields) => {
        
        const dateob = new Date();
        const reqt = `${dateob.getHours().toString().padStart(2, '0')}:${dateob.getMinutes().toString().padStart(2, '0')}:${dateob.getSeconds().toString().padStart(2, '0')}`;
        const reqd = `${dateob.getDate().toString().padStart(2, '0')}/${(dateob.getMonth() + 1).toString().padStart(2, '0')}/${dateob.getFullYear()}`;

        const newMessage = new Message({
            content : message,
            time : reqt,
            date : reqd,
            to : room,
            fromid : id,
            fromrole : role
        })

        await newMessage.save()
        
        if(room.includes('admin') && role !== 'Admin'){
          const newNotification = new Notification({
            senderName : senderName,
            senderId : id,
            to : room,
            role : role
          })
          await newNotification.save()
          
        }


        await socket.broadcast.emit('notifications', room)
        await io.to(room).emit("receive-room" ,message,role,reqd,reqt, senderName, fields, id) 

    })

    socket.on("getpreviouschats", async(currentRoom) =>{
        let roomMessages = await getMessagesFromRoom(currentRoom);
        const messages = roomMessages.reduce((acc, curr) => acc.concat(curr.students, curr.mentors, curr.admins), []);
        messages.sort((a, b) => {
          const dateA = new Date(a.date.split('/').reverse().join('-') + 'T' + a.time + 'Z');
          const dateB = new Date(b.date.split('/').reverse().join('-') + 'T' + b.time + 'Z');
          return dateA - dateB;
        });
        io.to(currentRoom).emit('room-messages', messages); 
    })

})

server.listen(MYPORT, () => {
    console.log(`Ready to serve you master on ${MYPORT}`)
})