import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Processing from '../components/Processing'
import ShadowBackground from '../components/ShadowBackground'
import Error from '../components/shared/Error'
import formStateReducer from '../reducers/form_reducers'
import { baseUrl } from '../utils/server'
import { VALIDATE_CAPTION, VALIDATE_IMAGE } from '../utils/validator'
const EditPostPage = (props) => {
    const [isLoading,setIsLoading] = useState(false)
    const [redirect,setRedirect] = useState(false)
    useEffect(async()=>{
        setIsLoading(true)
        const {id} =  props.match.params
        const response  = await fetch(`${baseUrl}/api/v1/posts/${id}`)
        const data = await response.json()

        const image = await fetch(`${baseUrl}/posts_images/${data.image}`)
        const imageBlob = await image.blob()
        dispatch({
            type:'SET_MY_POST',
            payload:{
                caption:data.caption,
                image:{
                    value:data.image,
                    file:imageBlob
                },
            }
        })
        setIsLoading(false)


    },[])
    
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
   const value = e.target.value
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
       dispatchProperties.payload.value = formState.image.value
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
   const postId =  props.match.params.id
   formData.append("caption",formState.caption.value)
   formData.append("image",formState.image.file,formState.image.value)
   formData.append("author",id)
   formData.append("postId",postId)
   
   const response = await fetch(`${baseUrl}/api/v1/posts`,{
       method:'PUT',
       body:formData,
       headers:{
           'authorization':`Bearer ${token}`
       }
   })
   setRedirect(true)


}

return redirect ? <Redirect to="/my-posts" />: (
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
                           <textarea name="caption" value={formState.caption.value} maxLength="50" onBlur={onBlurHandler} onChange={onChangeHandler} placeholder="add caption"></textarea>
                           {formState.caption.isBlurred && !formState.caption.isValid && <Error>caption should be less than 50 letter</Error>}

                       </div>
                       <div className="form-wrapper submit-button-wrapper">
                           <button type="submit" className={`submit-button ${!formState.isValid && "disabled-button"}`} disabled={!formState.isValid} >edit</button>
                       </div>
                   </form>
               </div>
               {isLoading && <ShadowBackground z_index="25" onShadowClickHandler={()=>{}}/>}
            {isLoading && <Processing/>}
       </>
)
}

export default withRouter(EditPostPage)
