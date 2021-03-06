import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../utils/server'
import './ImagePost.css'
import Modal from './Modal'
import ShadowBackground from './ShadowBackground'
import Avatar from './shared/Avatar'
import Card from './shared/Card'
import WarningModal from './WarningModal'
const ImagePost = ({deletePostHandler,post,openImageHandler,home}) => {
    const imageURL = `${baseUrl}/posts_images/${post.image}`
    
    return (
        <>
           
            <Card>
                <div className="img-container">
                    <img onClick={openImageHandler} src={imageURL}/>
                    <div className="user-image">
                        <Avatar src={post.author.image} />
                    </div>
                </div>
                <div className="caption">{post.caption}</div>
                
                {!home && <div className="modal-edit-delete-link">
                        <Link  to={`/edit-posts/${post._id}`} className="edit-button">edit</Link>
                        <Link to="#" onClick={deletePostHandler} className="delete-button">delete</Link>
                </div>}
                
            </Card>

            
        </>
    )
}

export default ImagePost
