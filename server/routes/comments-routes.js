const router = require('express').Router()
const HttpError = require('../models/HttpError')
const {PostModel, deleteComment, updateComment} = require('../models/post')
const auth = require('../middleware/authentication')
router.post('/api/v1/posts/:pid/comments',auth,async(req,res)=>{
    console.log(req.body)
    const {pid} = req.params
    const {content,commentorId,commentorName,commentorImage} = req.body;

    const doc = await PostModel.findById(pid)
    doc.comments.push({content,commentorId,commentorName,commentorImage})
    await doc.save()
    res.json(req.body)
})

router.delete('/api/v1/posts/:pid/comments/:cid',auth,async(req,res,next)=>{
    const {pid,cid} = req.params

    const  error = await deleteComment(pid,cid)
    if(error){
        return next(new HttpError("couln't delete comment",401))
    }
    res.json({
        "message":"comment successfuly deleted"
    })
})
router.put('/api/v1/posts/:pid/comments',async(req,res,next)=>{
    const {pid} = req.params
    const {commentId,content} = req.body
    const error = await updateComment(pid,commentId,content);
    if(error){
        return next(new HttpError("couldn't update commment",401))
    }
    res.json({
        "message":"comment successfuly updated"
    })
})

module.exports = router