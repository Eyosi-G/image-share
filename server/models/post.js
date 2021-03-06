const {Schema,model, SchemaType} = require('mongoose')
const { CommentSchema } = require('./comment')

const PostSchema = new Schema({
   image:{
       type:String
   },
   author:{
       ref:"User",
       type:Schema.Types.ObjectId       
   },
   caption:{
       type:String,
       default:""
   },
   createdAt:{
       type:Schema.Types.Date,
       default:new Date(),
   },
   comments:{
       type:[CommentSchema]
   }
}) 


const PostModel = model('Post',PostSchema)
const getPosts = async(authorId=undefined)=>{
    let posts = await PostModel.find(authorId && {
        "author" : authorId,
    }).populate('author').populate('commentorId')

    const newPosts = posts.map((post)=>{
        let postCopy = post.toObject()
        
        delete postCopy.author.password
        delete postCopy.author._id
        delete postCopy.author.name
        delete postCopy.author.email
        delete postCopy.author.__v
        return postCopy;

    })
    return newPosts
}
const createPost = async (post)=>{
    try {
        const response =  await PostModel.create(post)   
        return [response,null]
    } catch (error) {
        return [null,error]
    }

}
const deleteComment = async (postId,commentId) =>{
    try {
        const doc = await PostModel.findById(postId)
        doc.comments.pull(commentId)
        await doc.save()
        return null
    } catch (error) {
        return error
    }
}
const updateComment = async (postId,commentId,content)=>{
    try {
        const response = await PostModel.findById(postId)
        response.comments.forEach((comment)=>{
        if(comment._id == commentId){
            comment.content = content
        } })
        await response.save()
        return null
    } catch (error) {
        console.log(error)
        return error
    }
}
module.exports = {
    PostModel,
    PostSchema,
    deleteComment,
    updateComment,
    createPost,
    getPosts
}