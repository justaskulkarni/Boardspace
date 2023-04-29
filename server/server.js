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

const Mentor = require('./models/mentor')
const Student = require('./models/student')
const Message = require('./models/message')
const Admin = require('./models/admin')
const Notification = require('./models/notification')

app.use('/api/mentor/', mentorroutes)
app.use('/api/student/', studentroutes)
app.use('/api/admin/', adminroutes)
app.use('/api/chat', chatroutes)

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
    console.log(socket.id)

    socket.on("join-room", async(prevroom,room, role) => {
        await socket.leave(prevroom)
        await socket.join(room)
        if(room.includes('admin')){
          Notification.findOneAndDelete({ to: room }, (err, doc) => {
            if (err) {
              console.log(err);
            } else {
              console.log(doc);
            }
            });
        }
    })

    socket.on("join-one", async(room, role) => {
        await socket.join(room)
        if(room.includes('admin')){
          Notification.findOneAndDelete({ to: room }, (err, doc) => {
            if (err) {
              console.log(err);
            } else {
              console.log(doc);
            }
            });
        }
    })

    socket.on("send-room", async(room,message,role,id, senderName, fields) => {
        
        const dateob = new Date()
        const reqt = dateob.getHours()+':'+dateob.getMinutes()
        const reqd = dateob.getDate() +"/"+dateob.getMonth()+"/"+dateob.getFullYear()

        const newMessage = new Message({
            content : message,
            time : reqt,
            date : reqd,
            to : room,
            fromid : id,
            fromrole : role
        })

        await newMessage.save()
        
        if(room.includes('admin')){
          const newNotification = new Notification({
            senderName : senderName,
            senderId : id,
            to : room,
            role : role
          })
          await newNotification.save()
          console.log(newNotification)
        }


        await socket.broadcast.emit('notifications', room)
        await io.to(room).emit("receive-room" ,message,role,reqd,reqt, senderName, fields, id) 

    })

    socket.on("getpreviouschats", async(currentRoom) =>{
        let roomMessages = await getMessagesFromRoom(currentRoom);
        const messages = roomMessages.reduce((acc, curr) => acc.concat(curr.students, curr.mentors, curr.admins), []);
        messages.sort((a, b) => {
        const dateComparison = a.date.localeCompare(b.date);
        if (dateComparison === 0) {
            return a.time.localeCompare(b.time);
        }
        return dateComparison;
        });
        io.to(currentRoom).emit('room-messages', messages); 
    })

})

// app.post('/temp', uploader.single('image'), async(req,res) => {
    
//     const haha = await cloudinary.uploader.upload(req.file.path)

//     console.log(haha.secure_url)
// })

// app.get('/temp' , async (req,res) => {

//     // const newMessage = new Message({
//     //     content : "Hey",
//     //     fromid : "64257e870ea24575379b7885",
//     //     fromrole : "Admin"
//     // })

//     // await newMessage.save()

//     const reqmessage = await Message.findById('643e5ddc24c587d5c9d85efc')

//     if(reqmessage.fromrole === "Admin")
//     {
//         const dets = await Admin.findById(reqmessage.fromid)
//         res.send(dets)
//         return
//     }

//     res.send("jhala")
// })

server.listen(MYPORT, () => {
    console.log(`Ready to serve you master on ${MYPORT}`)
})