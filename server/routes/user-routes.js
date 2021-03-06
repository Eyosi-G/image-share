
const router = require('express').Router()
const fs = require('fs')
const {uploadImage,upload} = require('../middleware/file_upload')
const HttpError = require('../models/HttpError')
const { UserModel } = require('../models/user')
const multer = require('multer')
const { json } = require('body-parser')
const jwt = require('jsonwebtoken')
const {key} = require('../utils/signing_key')

router.post('/login',async(req,res,next)=>{
    const {password,email} = req.body
    const doc = await UserModel.findOne({
        "email":email
    }).populate()
    if(!doc){
        return next(new HttpError("error on password or email",401))
    }
    if(doc.password !== password){
        return next(new HttpError('error on password or email',401))
    }
    const payload = {
        id:doc._id
    }
    const token = jwt.sign(payload,key,{
        expiresIn:'2h'
    })
    res.json({
        token:token,
        name:doc.name,
        image:doc.image,
        id:doc._id
    })
    
    
})

router.post('/register',upload("register").single('image'),uploadImage,async(req,res,next)=>{
    const {filename} = req.file
    const {userName,password,email} = req.body
    const user = {
        name:userName,
        password:password,
        email:email,
        image:filename
    }
    const userDoc = await UserModel.findOne({
        email:email
    })
    if(userDoc){
        fs.unlink(`${__dirname}/../users_images/${filename}`,()=>{
            next(new HttpError('user already exist',400))
        })
    }else{
        const doc = await UserModel.create(user)
        res.send(doc)
    }
    
})





module.exports = router