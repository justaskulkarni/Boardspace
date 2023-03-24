if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


const temproutes = require('./routes/temproutes')



app.use('/api/',temproutes)



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