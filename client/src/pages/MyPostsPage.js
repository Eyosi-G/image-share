import React, { useContext, useEffect, useState } from 'react'
import ImagePostList from '../components/ImagePostList'
import NavBar from '../components/NavBar'
import { MyPostContext } from '../contexts/MyPostContext'
import { baseUrl } from '../utils/server'

const MyPostsPage = () => {
    const {myPosts,setMyPosts} = useContext(MyPostContext)

    useEffect(async()=>{
        const {id} = JSON.parse(localStorage.getItem('userData'))
        const response = await fetch(`${baseUrl}/api/v1/users/${id}/posts`,{
            method:"GET"
        })
        const data = await response.json()
        setMyPosts(data)
    },[])

    return (
        <div>
            <NavBar />
            <ImagePostList posts={myPosts} title="My Posts"/>

        </div>
    )
}

export default MyPostsPage
