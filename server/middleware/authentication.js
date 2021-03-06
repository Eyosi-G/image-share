const {key} = require('../utils/signing_key')
const jwt = require('jsonwebtoken')
const HttpError = require('../models/HttpError')
const auth = (req,res,next)=>{
    const {authorization} = req.headers
    const token = authorization.split(" ")[1]
    try {
        const decoded = jwt.verify(token,key)
        const {id} = decoded
        req.id = id;
        next()
    } catch (error) {
        console.log(error)
        next(new HttpError('authentication failed',401))
    }
}
module.exports = auth