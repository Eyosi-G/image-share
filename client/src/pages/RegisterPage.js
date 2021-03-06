import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Link ,Redirect,withRouter} from 'react-router-dom'
import Processing from '../components/Processing'
import Error from '../components/shared/Error'
import ShadowBackground from '../components/ShadowBackground'
import { VALIDATE_EMAIL, VALIDATE_IMAGE, VALIDATE_PASSWORD, VALIDATE_USER_NAME } from '../utils/validator'
import './RegisterPage.css'
import { baseUrl } from '../utils/server'
import formStateReducer from '../reducers/form_reducers'


const RegisterPage = ({history}) => {
    const [formState, dispatch] = useReducer(formStateReducer, {
        email:{
            value:"",
            isValid:false,
            isBlurred:false,
            parameters:[
                VALIDATE_EMAIL
            ]
        },
        password:{
            value:"",
            isValid:false,
            isBlurred:false,
            parameters:[
                VALIDATE_PASSWORD
            ]
        },
        repeatPassword:{
            value:"",
            isValid:false,
            isBlurred:false,
            parameters:[
                VALIDATE_PASSWORD
            ]
        },
        userName:{
            value:"",
            isValid:false,
            isBlurred:false,
            parameters:[
                VALIDATE_USER_NAME
            ]
        },
        image:{
            value:"",
            file:undefined,
            isValid:false,
            isBlurred:false,
            parameters:[
                VALIDATE_IMAGE
            ]
        },
        isValid:false
    })
    const imgRef = useRef()
    const [isLoading,setIsLoading] = useState(false)
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
        imgRef.current.click()
        dispatch({
            type:"ON_BLUR",
            payload:"image"
        })
    }
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        
        formData.append("userName",formState.userName.value)
        formData.append("password",formState.password.value)
        formData.append("email",formState.email.value)
        formData.append("image",formState.image.file,formState.image.value)

        try {
            const response = await fetch(`${baseUrl}/register`,{
                method:'POST',
                body:formData,
            }) 
            const status = response.status
            setIsLoading(false);
            history.push("/login")

        } catch (error) {
            console.log(error)
        }
        

    }
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div className="register-inputs-wrapper">
                    <h1 className="sub-title">Sign Up </h1>
                    <div className="input-container">
                            <p>Email</p>
                            <input name="email" value ={formState.email.value} onChange={onChangeHandler}  onBlur={onBlurHandler} placeholder="example@gmail.com" type="email"/>
                            {(formState.email.isBlurred)  && !(formState.email.isValid) && <Error>please write valid email address</Error>}
                    </div>
                    <div className="__auth_info_wrapper">
                        <div className="input-container">
                            <p>password</p>
                            <input name="password" value ={formState.password.value} onChange={onChangeHandler}  onBlur={onBlurHandler} placeholder="**********" type="password"/>
                            {(formState.password.isBlurred)  && !(formState.password.isValid) && <Error>password should be min of 8 characters containing letters, number and special character</Error>}
                        </div>
                        <div className="input-container">
                            <p>Repeat Password</p>
                            <input name="repeatPassword" value ={formState.repeatPassword.value} onChange={onChangeHandler}  onBlur={onBlurHandler} placeholder="**********" type="password"/>
                            {(formState.repeatPassword.isBlurred)  && !(formState.repeatPassword.isValid) && 
                            <Error>password don't match</Error>}
                        </div>               
                    </div>
                    <h2 className="sub-title">Basic Information</h2>
                    <div className="input-container">
                            <p>User Name</p>
                            <input name="userName" value ={formState.userName.value} onChange={onChangeHandler}  onBlur={onBlurHandler} placeholder="abebe" type="text"/>
                            {(formState.userName.isBlurred)  && !(formState.userName.isValid) && 
                            <Error>username should be between 5 to 20 combination of alaphabetic characters</Error>}
                    </div>                    <div className="input-container">
                            <p>Image Preview</p>
                            <div className="image-preview">
                                    {formState.image.file && <img src={URL.createObjectURL(formState.image.file)}/>}
                                    {!formState.image.file && <div className="image-frame"><p>please add image</p></div>}
                                    <input name="image" accept=".jpg,.jpeg,.png" type="file" className="default-file-picker" onChange={onChangeHandler} ref={imgRef} />
                                    {(formState.image.isBlurred)  && !(formState.image.isValid) && 
                                    <Error>pick an image of jpg , jpeg or png</Error>}
                                    <button onClick={openFilePickerHandler} type="button" className="custom-file-picker" >+ pick image</button>
                            </div> 
                    </div>
                    
                    <div className="submit-button-wrapper">
                    <button type="submit" className={`submit-button ${!formState.isValid && "disabled-button"}`} disabled={!formState.isValid}>register</button>
                    </div>
                <p className="login-message">Have an account already ? please login {<Link to="/login">here</Link>}</p>
                </div>
                {isLoading && <ShadowBackground onShadowClickHandler={()=>{}}/>}
                {isLoading && <Processing/>}
            </form>

        </>
    )
}

export default withRouter(RegisterPage)
