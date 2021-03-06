import React, { useContext, useRef, useState } from 'react'
import { PostContext } from '../contexts/PostContext'
import { baseUrl } from '../utils/server'
import './AddCommentForm.css'
import Processing from './Processing'
import ShadowBackground from './ShadowBackground'
const AddCommentForm = ({post}) => {
    const submitButtonRef = useRef(undefined)
    const [comment,setComment] = useState('')
    const [isLoading,setIsLoading]=useState(false)
    const {posts,setPosts} = useContext(PostContext)
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const {_id} = post
        const {id,name,image,token}= JSON.parse(localStorage.getItem('userData'))
        const commentBody = {
            content:comment,
            commentorId:id,
            commentorName:name,
            commentorImage:image,
        }
        const response = await fetch(`${baseUrl}/api/v1/posts/${_id}/comments`,{
            method:"POST",
            body:JSON.stringify(commentBody),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        const postCopy = {...post}
        postCopy.comments.push(data)
        const newPosts = posts.map((post)=>{
            if(post._id === _id){
                return postCopy;
            }else{
                return post
            }
        })
        
        setPosts(newPosts)
        setIsLoading(false)
        setComment('')

    }
    const onKeyUpHandler = (e)=>{
        if(e.keyCode===13 && !e.shiftKey){
            submitButtonRef.current.click()
        }
    }
    const onChangeHandler = (e)=>{
        setComment(e.target.value)
    }
    return (
        <>
            <div className="comment-field-container">
                <form onSubmit={onSubmitHandler}>
                    <textarea onChange={onChangeHandler} value={comment} placeholder="write comment here" className="comment-field" onKeyUp={onKeyUpHandler}></textarea>
                    <div className="submit-button-wrapper">
                        <button  ref={submitButtonRef} type="submit" className={`submit-button`} >add comment</button>
                    </div>       
                </form>
            </div>
            {isLoading && <ShadowBackground z_index="25" onShadowClickHandler={()=>{}}/>}
            {isLoading && <Processing/>}
        </>
    )
}

export default AddCommentForm
