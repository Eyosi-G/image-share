import React, { useContext, useEffect } from 'react'
import ImagePostList from '../components/ImagePostList'
import Modal from '../components/Modal'
import NavBar from '../components/NavBar'
import ShadowBackground from '../components/ShadowBackground'
import WarningModal from '../components/WarningModal'
import { PostContext } from '../contexts/PostContext'
import { baseUrl } from '../utils/server'
const HomePage = () => {
    const {posts,setPosts} = useContext(PostContext)
    useEffect(async()=>{
        const response = await fetch(`${baseUrl}/api/v1/posts`,{
            method:"GET"
        })
        const data = await response.json()
        setPosts(data)
    },[])

    return (
        <div>
            <NavBar home/>
            <ImagePostList posts={posts} title="Recent Posts" home/>
            {/* <ShadowBackground onClickHandler={onClickHandler}/>
            <Modal/> */}
            {/* <ShadowBackground/>
            <WarningModal message="Are you sure you want to delete this post ?"/> */}
        </div>
    )
}

export default HomePage
