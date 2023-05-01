if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router()

const Post = require('../models/post')
const Comment = require('../models/comment')

router.get('/getpostcomments/:id', async(req, res) =>{
    const {id} = req.params;
    try {
        Comment.find({ postid: id }, async (err, data) => {
            if (err) {
                throw Error(`${err}`)
            }
            else {
                res.json({ success: true, data: data })
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router