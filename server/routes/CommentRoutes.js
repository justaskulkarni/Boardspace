if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router()

const Post = require('../models/post')
const Comment = require('../models/comment')

router.get('/getall/:id', async(req, res) =>{
    const {id} = req.params;
    if(id)
    {
        try {
            Comment.find({ postid: id })
                .sort({createdAt : 'asc'})
                .populate('commentedby')
                .exec ( (err, data) => {
                if (err) {
                    throw Error(`${err}`)
                }
                else if(data.length != 0){
                    res.json({ success: true, data: data })
                }
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    
})

router.post('/create/mentor/:id', async(req,res) => {
    const {id} = req.params

    if(!req.body.cont)
        {
            throw Error("Blank comments are not excepted")
        }

    try {
        
        const comm = new Comment({
          content : req.body.cont,
          commentedby : req.body.ownerid,
          postid : id  
        })

        await comm.save()

        res.json({success : true})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/create/student/:id', async(req,res) => {
    const {id} = req.params

    try {
        
        if(!req.body.cont)
        {
            throw Error("Blank comments are not excepted")
        }

        const comm = new Comment({
          content : req.body.cont,
          commentedbyme : true,
          postid : id  
        })

        await comm.save()

        res.json({success : true})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router