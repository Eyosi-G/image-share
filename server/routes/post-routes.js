const { PostSchema, PostModel,createPost } = require('../models/post')
const {body, validationResult} = require('express-validator')
const HttpError = require('../models/HttpError')
const { upload,uploadImage } = require('../middleware/file_upload')
const {getPosts} = require('../models/post')
const auth = require('../middleware/authentication')
const fs = require('fs')
const router = require('express').Router()

router.get('/api/v1/users/:uid/posts',async(req,res)=>{
    const {uid} = req.params
    const posts = await getPosts(uid)
    res.json(posts)
})

router.get('/api/v1/posts/:pid',async(req,res)=>{
    const {pid} = req.params;
    const post = await PostModel.findById(pid)
    res.json(post)
})

router.get('/api/v1/posts',async(req,res)=>{
    const posts = await getPosts()
    res.json(posts)
})



router.post('/api/v1/posts',auth,upload().single('image'),uploadImage,[ 
    body('author').notEmpty(),
    ],async(req,res,next)=>{

   const errors =  validationResult(req)
   if(!errors.isEmpty()){
       return next(new HttpError("error on parsing the body",401))
   }
   const {filename} = req.file
   const {author,caption} = req.body
   if(author===req.id){
        const data = {
            image:filename,
            author:author,
            caption:caption || ""
        }
        const [response,error] = await createPost(data)
        if(error){
            return next(new HttpError("Can't create post",500))
        }
        res.json(response)
   }else{
       next(new HttpError('unauthorized request',401))
   }
   
})

router.delete('/api/v1/posts/:pid',auth,async(req,res,next)=>{
    const {pid} = req.params;
    const doc = await PostModel.findById(pid)
    const userId = req.id
    const filename  = doc.image
    console.log(doc.author,userId)
    if(doc.author.toString() === userId){
        fs.unlink(`${__dirname}/../posts_images/${filename}`,async()=>{
            await PostModel.deleteOne({
                _id:pid
            })
            res.status(200).end()
        })
    }else{
        
        next(new HttpError('unauthorized request',401))
    }
    
})

router.put('/api/v1/posts',auth,upload("editPost").single('image'),async(req,res)=>{
   const {filename} = req.file
   const {author,caption,postId} = req.body
    
   if(author===req.id){
        await PostModel.update({_id:postId},{
            $set:{
                caption:caption
            }
        })
        res.status(200).end()
   }else{
       next(new HttpError('unauthorized request',401))
   }


})




module.exports = router;

