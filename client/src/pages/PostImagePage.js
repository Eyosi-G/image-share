import React, { useReducer, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import './PostImagePage.css'
import formStateReducer from '../reducers/form_reducers'
import { VALIDATE_CAPTION, VALIDATE_IMAGE, VALIDATE_USER_NAME } from '../utils/validator'
import Error from '../components/shared/Error'
import {withRouter} from 'react-router-dom'
import { baseUrl } from '../utils/server'
const PostImagePage = ({history}) => {
    const [formState,dispatch] = useReducer(formStateReducer,{
             isValid:false,
             image:{
                value:"",
                file:undefined,
                isValid:false,
                isBlurred:false,
                parameters:[
                    VALIDATE_IMAGE
                ]
             },
             caption:{
                 value:"",
                 isValid:true,
                 isBlurred:false,
                 parameters:[
                     VALIDATE_CAPTION
                 ]
             }

    })

    const imagePickerRef = useRef()

    const onBlurHandler = (e)=>{
        const name = e.target.name
        dispatch({
            type:"ON_BLUR",
            payload:name
        })
    }
    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        const dispatchProperties = {
            type:"ON_CHANGE",
            payload:{
                name:name,
                value:value
            }
        }
        if(name=="image"){
            const file = e.target.files[0]
            dispatchProperties.payload.file = file
        }
        dispatch(dispatchProperties)
    }
    
    const openFilePickerHandler = (e)=>{
        imagePickerRef.current.click()
        dispatch({
            type:"ON_BLUR",
            payload:"image"
        })
    }
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        const {id,token} = JSON.parse(localStorage.getItem('userData'))
        const formData = new FormData()
        
        formData.append("caption",formState.caption.value)
        formData.append("image",formState.image.file,formState.image.value)
        formData.append("author",id)
        
        const response = await fetch(`${baseUrl}/api/v1/posts`,{
            method:'POST',
            body:formData,
            headers:{
                'authorization':`bearer ${token}`
            }
        })
        history.push('/my-posts')


    }



    return (
            <>
                <NavBar post/>
                    <div className="form-container">
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-wrapper image-preview">
                                {!formState.image.file && <div className="image-frame">please pick image</div>}
                                {formState.image.file && <img src={URL.createObjectURL(formState.image.file)}/>}
                                {formState.image.isBlurred && !formState.image.isValid && <Error>image is required</Error>}
                            </div>
                            <input name="image" ref={imagePickerRef} onChange={onChangeHandler} accept=".jpg,.jpeg,.png" type="file" className="default-file-picker"/>
                            <div className="form-wrapper custom-file-picker-container">
                                <button  onClick={openFilePickerHandler} type="button" className="custom-file-picker" >+ pick image</button>
                            </div>
                            <div className="form-wrapper caption-wrapper">
                                <textarea name="caption" maxLength="50" onBlur={onBlurHandler} onChange={onChangeHandler} placeholder="add caption"></textarea>
                                {formState.caption.isBlurred && !formState.caption.isValid && <Error>caption should be less than 50 letter</Error>}

                            </div>
                            <div className="form-wrapper submit-button-wrapper">
                                <button type="submit" className={`submit-button ${!formState.isValid && "disabled-button"}`} disabled={!formState.isValid} >post</button>
                            </div>
                        </form>
                    </div>
            </>
    )
}

export default withRouter(PostImagePage)
