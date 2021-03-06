const {Schema,model} = require('mongoose')


const CommentSchema = new Schema({
    content:String,
    commentorId:String,
    commentorName:String,
    commentorImage:String,
})

const CommentModel = model('Comment',CommentSchema)

module.exports = {
    CommentModel,
    CommentSchema,
}