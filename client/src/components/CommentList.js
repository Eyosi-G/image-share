import React from 'react'
import Comment from './Comment'
import './CommentList.css'
const CommentList = ({comments}) => {
    return (
        <div className="comments-container">
        {
            comments.map((comment)=>{
                return <Comment comment={comment}/>
            })
        }

        </div>
    )
}
export default CommentList
