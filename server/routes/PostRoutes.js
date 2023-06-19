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

router.get('/getpost/:hashtag', async(req, res) =>{
    try {
        const {hashtag} = req.params;
        const reqpost = await Post.findOne({hashtag: hashtag})

        const getObjectParams = {
            Bucket : process.env.BUCKET_NAME,
            Key : reqpost.id,
            ContentType : 'image/jpeg',
        }

        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3, command, {expiresIn : 3600})

        res.json({ success: true, rpost : reqpost, imgurl : url, postid : reqpost.imgurl, solv : reqpost.solved})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/getallpost/student/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const [jeeposts, neetposts, icseposts, sscposts, igcseposts, cbseposts, iscposts, ibposts, hscposts] = await Promise.all([
            Post.find({ doubtaskedby: id, tag: 'JEE' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'Neet' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'ICSE' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'SSC' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'IGCSE' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'CBSE' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'ISC' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'IB' }).sort({ solved: 1 }),
            Post.find({ doubtaskedby: id, tag: 'HSC' }).sort({ solved: 1 }),
        ]);
        res.json({ success: true, jeep : jeeposts, neetp : neetposts, icsep : icseposts, sscp : sscposts, igcsep : igcseposts, cbsep : cbseposts, iscp : iscposts, ibp : ibposts, hscp : hscposts })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

router.get('/getallpost/mentor', async(req, res) =>{
    try{
        
        const [jeeposts, neetposts, icseposts, sscposts, igcseposts, cbseposts, iscposts, ibposts, hscposts] = await Promise.all([
            Post.find({ tag: 'JEE' }).sort({ solved: 1 }),
            Post.find({ tag: 'Neet' }).sort({ solved: 1 }),
            Post.find({ tag: 'ICSE' }).sort({ solved: 1 }),
            Post.find({ tag: 'SSC' }).sort({ solved: 1 }),
            Post.find({ tag: 'IGCSE' }).sort({ solved: 1 }),
            Post.find({ tag: 'CBSE' }).sort({ solved: 1 }),
            Post.find({ tag: 'ISC' }).sort({ solved: 1 }),
            Post.find({ tag: 'IB' }).sort({ solved: 1 }),
            Post.find({ tag: 'HSC' }).sort({ solved: 1 }),
        ]);
        res.json({ success: true, jeep : jeeposts, neetp : neetposts, icsep : icseposts, sscp : sscposts, igcsep : igcseposts, cbsep : cbseposts, iscp : iscposts, ibp : ibposts, hscp : hscposts })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

router.get('/changsolv/:hash' , async(req,res) => {
    try {
        
        const {hash} = req.params

        const reqp = await Post.findOne({hashtag : hash})
        reqp.solved = !reqp.solved
        await reqp.save()

        res.json({success : true})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/isValid/:hash', async(req, res) =>{
    try {
        const {hash} = req.params;
        const reqp = await Post.findOne({hashtag: hash})
        if(reqp){
            res.json({success : true})
        }
        else{
            res.json({success : false})
        }
    } catch (error) {
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