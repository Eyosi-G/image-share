import React, { Component, useCallback, useContext, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { MyPostContext } from '../contexts/MyPostContext'
import { PostContext } from '../contexts/PostContext'
import { baseUrl } from '../utils/server'
import ImagePost from './ImagePost'
import './ImagePostList.css'
import Modal from './Modal'
import ShadowBackground from './ShadowBackground'
import WarningModal from './WarningModal'
class ImagePostList extends Component {

    static contextType =  MyPostContext
    state = {
        isModalOpened:false,
        selectedPost:{},
        isWarningOpen:false,
        tobeDeletedPost:{}
    }

    openImageHandler =(post)=>{
        this.setState({
            isModalOpened:true,
            selectedPost:post
        })
    }
    onShadowClickHandler = ()=>{
         this.setState({
             isModalOpened:false,
             isWarningOpen:false
         })
    }
    deletePostHandler = (post)=>{
         this.setState({
             isWarningOpen:true,
             tobeDeletedPost:post
         })
    }
    deleteConfirmHandler = async()=>{
        const {myPosts,setMyPosts} = this.context
        const {_id} = this.state.tobeDeletedPost
        const {token} = JSON.parse(localStorage.getItem('userData'))
        const response = await fetch(`${baseUrl}/api/v1/posts/${_id}`,
        { 
            method:"delete",
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
        if(response.ok){
            const newPosts = myPosts.filter((myPost)=>{
                return myPost._id !== _id
            })
            setMyPosts(newPosts)
            this.setState({isWarningOpen:false})
        }
        
    }

    render(){
        const {posts,title,home} = this.props;
        const {isModalOpened,selectedPost,isWarningOpen} = this.state;
        return(
            <>
                <h1 className="title">{title}</h1>
                <div className="grid-container">
                    {posts.map(post=>(
                        <div key={post._id} className="grid-item">
                            <ImagePost deletePostHandler={(e)=>this.deletePostHandler(post)} post={post} home={home} openImageHandler={()=>this.openImageHandler(post)}/>
                        </div>
                    ))}
                </div>
                {isModalOpened && <ShadowBackground onShadowClickHandler={this.onShadowClickHandler}/>}
                {isModalOpened && <Modal home={home} post={selectedPost}/>}
    
                {isWarningOpen && <ShadowBackground onShadowClickHandler={this.onShadowClickHandler}/>}
                {isWarningOpen && <WarningModal deleteConfirmHandler={this.deleteConfirmHandler} message="Are you sure you want to delete this post ?"/>}
            </>
        )
   }
}
    

export default ImagePostList
