import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { baseUrl } from '../utils/server'
import AddCommentForm from './AddCommentForm'
import CommentList from './CommentList'
import './Modal.css'
import Avatar from './shared/Avatar'
const Modal = ({post,home}) => {
    const [userData,setUserData]= useState(undefined)
    useEffect(()=>{
        const userData = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))
        setUserData(userData)
    },[])
    const imageURL = `${baseUrl}/posts_images/${post.image}`

    const content =  (
        <div className="modal-wrapper">
            <div className="modal-container">
                <div className="modal-img-container">
                    <img src={imageURL}/>
                    <div className="user-image">
                        <Avatar src={post.author.image}/>
                    </div>
                </div>
                <p className="modal-caption">{post.caption}</p>
                

                {home && userData && <AddCommentForm post={post}/>}
                <CommentList comments={post.comments}/>

            </div>
        </div>
        
    )
    return ReactDOM.createPortal(content,document.getElementById('modal'))
}

export default Modal
