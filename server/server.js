if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const app = express();
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


const mentorroutes = require('./routes/MentorRoutes')
const studentroutes = require('./routes/StudentRoutes')
const adminroutes = require('./routes/AdminRoutes')

app.use('/api/mentor/',mentorroutes)
app.use('/api/student/',studentroutes)
app.use('/api/admin/' ,adminroutes)

const DB_URL = process.env.MONGO_URL
mongoose.connect(DB_URL)
.then(() => console.log('Mongoup'))
.catch(e => console.log(e))


app.get('/', (req,res) =>{
    res.send("Welcome to home page sir")
})

const MYPORT = process.env.PORT || 6100

app.listen(MYPORT, () =>{
    console.log(`Ready to serve you master on ${MYPORT}`)
})