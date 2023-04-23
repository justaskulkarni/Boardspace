if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router()

const Student = require('../models/student')
const Mentor = require('../models/mentor')
const Admin = require('../models/admin')
const Message = require('../models/message')

router.post('/details', async(req, res) =>{
    console.log(req.body.userId)
    try{
        if(req.body.role == 'Student'){
            const user1 = await Student.findById(req.body.userId)
            console.log(user1.stname)
            res.json({ name: user1.stname })              
        }
        else if(req.body.role == 'Admin'){
            const user2 = await Admin.findById(req.body.userId)
            console.log(user2.username)      
            res.json({ name: user2.username })        
        }
        else{
            const user3 = await Mentor.findById(req.body.userId)
            console.log(user3.name, req.body.role)   
            res.json({ name: user3.name })           
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({ error: error.message })    
    }
})

module.exports = router;