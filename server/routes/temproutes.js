if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const User = require('../models/user')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const router = express.Router()

const createToken = (id) => {
    return jwt.sign({ id }, process.env,SECRET , {
        expiresIn: 3 * 24 * 60 * 60
    });
}

router.post('/login', async(req,res) =>{
    if(!req.body.username || !req.body.password)
    {
        throw Error('All fields must be filled')
    }

    const requser = await User.findOne({username : req.body.username})

    if(!requser)
    {
        throw Error('Incorrect username')
    }

    try{
        const match = await bcrypt.compare(req.body.password,requser.password)

        if(!match)
        {
            throw Error('Password is incorrect')
        }
        else{
            const token = createToken(requser._id)
            res.json({token})
        }
        

    }catch(error)
    {
        res.json({mssg: error.message})
    }


})

router.post('/signup', async(req,res) =>{

    if(!req.body.email || !req.body.password || !req.body.username)
    {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(req.body.email))
    {
        throw Error('Email not valid')
    }

    if(!validator.isStrongPassword(req.body.password))
    {
        throw Error('Password not strong enough')
    }

    try{
        const salt = await bcrypt.genSalt(12)
        pass = req.body.password
        const hashp = await bcrypt.hash(pass, salt);

        const newUser = new User({

            email : req.body.email,
            username : req.body.username,
            password : hashp
        })

        await newUser.save()

        const token = createToken(newUser._id)

        res.json(req.body.username,token)

    }catch(error){
        res.json({error : error.message})
    }
})

module.exports = router;