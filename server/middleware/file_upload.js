const multer = require('multer')
const HttpError = require('../models/HttpError')
const registerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'users_images')
    },
    filename:(req,file,cb)=>{
        const extension = file.mimetype.split('/')[1]
        const imageName = (Date.now())+"."+extension
        cb(null,imageName)
    }
})
const postStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'posts_images')
    },
    filename:(req,file,cb)=>{
        console.log(file)
        const extension = file.mimetype.split('/')[1]
        const imageName = (Date.now())+"."+extension
        cb(null,imageName)
    }
})
const editPostStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file)

        cb(null,'posts_images')
    },
    filename:(req,file,cb)=>{
        const {originalname} = file
        cb(null,originalname)
    }
})

const upload = (name=undefined)=>{
    if(name==="register"){
        return multer({
            storage:registerStorage,
        })
    }
    if(name==="editPost"){
        return multer({
            storage:editPostStorage
        })
    }
    return multer({
        storage:postStorage
    })
} 
const uploadImage = (req,res,next)=>{
    const file  = req.file
    if(file){
        next()
    }else{
        next(new HttpError("file couldn't be found",400))
    }
}
module.exports.upload = upload;
module.exports.uploadImage = uploadImage;
