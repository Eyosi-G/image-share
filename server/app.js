const express = require('express')
require('./db')
const app = express()
const cors = require('cors')
const HttpError = require('./models/HttpError')
const postRoute = require('./routes/post-routes')
const commetRoute = require('./routes/comments-routes')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user-routes')
app.use(cors())

app.use(bodyParser.json());
app.use("/users_images",express.static('users_images'))
app.use("/posts_images",express.static('posts_images'))
app.use(postRoute)
app.use(commetRoute)
app.use(userRoute)
app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500)
    res.json({
        message:error.message || 'unknown error has occured',
        statusCode: error.statusCode || 500
    })
})
app.listen('5000',()=>console.log('started on port 5000'))
