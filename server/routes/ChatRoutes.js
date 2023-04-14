if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const asycHandler = require("express-async-handler");

const Chat = require("../models/chat")
const Student = require("../models/student")
const Mentor = require("../models/mentor")
const Admin = require("../models/admin")

const router = express.Router()

router.post('/', asycHandler(async(req, res) =>{

}))

module.exports = router;
