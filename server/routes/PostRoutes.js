if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const multer = require('multer')

const { S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")

const s3 = new S3Client({
    
    credentials: {
        accessKeyId : process.env.ACCESS_KEY,
        secretAccessKey : process.env.SECRET_KEY,
    },
    
    region : process.env.BUCKET_REGION
})

const storage = multer.memoryStorage()
const upload = multer({storage : storage})

const router = express.Router()

const Post = require('../models/post')

router.post('/create', upload.single('image'), async (req, res) => {

    try {

        const newpost = new Post({
            doubtaskedby : req.body.sid,
            caption : req.body.caption,
            tag : req.body.tag,
        })

        await newpost.save()
        const string = newpost.id
        
        const params = {
            Bucket : process.env.BUCKET_NAME,
            Content : req.file.mimetype,
            Key : string,
            Body : req.file.buffer,
            ContentType : 'image/jpeg'
        }

        const command = new PutObjectCommand(params)
        await s3.send(command)

        const reqpost = await Post.findById(newpost.id)
        reqpost.imgurl = reqpost.id
        await reqpost.save()

        res.json({success : true})  

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;

// postSchema.pre('save', async function(next) {
//     try {
//       if (this.isNew) {
//         const count = await Post.countDocuments({});
//         this.hashtag = count + 1;
//       }
//       return next();
//     } catch (err) {
//       return next(err);
//     }
//   });