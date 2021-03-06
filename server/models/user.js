
const {model,Schema} = require('mongoose')
const { PostSchema } = require('./post')

const UserSchema = new Schema({
    name:String,
    password:String,
    email:String,
    image:String
})

const UserModel = model('User',UserSchema)

module.exports = {
    UserSchema,
    UserModel
}