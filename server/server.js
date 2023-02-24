if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
app.use(express.urlencoded({extended : true}))
const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URL

mongoose.connect(DB_URL)
.then(() => console.log('Mongoup'))
.catch(e => console.log(e))

app.get('/', (req,res) =>{
    res.send("Welcome to home page sir")
})

const MYPORT = process.env.PORT || 6001

app.listen(MYPORT, () =>{
    console.log("Ready to serve you master")
})