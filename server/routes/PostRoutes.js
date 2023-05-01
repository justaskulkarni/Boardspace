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

router.get('getpost/:hashtag', async(req, res) =>{
    try {
        const {hashtag} = req.params;
        const reqpost = await Post.findOne({hashtag: hashtag})
        res.json({ success: true, reqpost})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/getallpostsofstudent/:id', async(req, res) =>{
    try{
        const {studentid} = req.params;
        const [jeeposts, neetposts, icseposts, igcseposts, cbseposts, iscposts, ibposts, hscposts] = await Promise.all([
            Post.find({ doubtaskedby: studentid, tag: 'JEE' }),
            Post.find({ doubtaskedby: studentid, tag: 'Neet' }),
            Post.find({ doubtaskedby: studentid, tag: 'ICSE' }),
            Post.find({ doubtaskedby: studentid, tag: 'IGCSE' }),
            Post.find({ doubtaskedby: studentid, tag: 'CBSE' }),
            Post.find({ doubtaskedby: studentid, tag: 'ISC' }),
            Post.find({ doubtaskedby: studentid, tag: 'IB' }),
            Post.find({ doubtaskedby: studentid, tag: 'HSC' })
        ]);
        res.json({ success: true, jeeposts, neetposts, icseposts, igcseposts, cbseposts, iscposts, ibposts, hscposts })
    }
    catch(error){
        res.status(400).json({error: error.message})
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