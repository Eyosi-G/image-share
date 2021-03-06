import React from 'react'
import './Comment.css'
import Avatar from './shared/Avatar'
const Comment = ({comment}) => {
    return (
        <section className="comment-section">
            <div className="comment-head"><Avatar src={comment.commentorImage}/></div>
            <div className="comment-body">
                <h4>{comment.commentorName}</h4>
                <p>{comment.content}</p>
            </div>
        </section>
    )
}

export default Comment
