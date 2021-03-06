import React, { useState } from 'react'
import { Link,Redirect,withRouter } from 'react-router-dom'
import Processing from '../components/Processing'
import { baseUrl } from '../utils/server'
import './LoginPage.css'
const LoginPage = () => {
    const [login,setLogin] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })
    const onChangeHandler = (e)=>{
        setLoginInfo({
            ...loginInfo,
            [e.target.name]:e.target.value
        })
    }
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/login`,{
            method:"POST",
            body:JSON.stringify(loginInfo),
            headers:{
                "content-type":"application/json"
            }
        })  
        if(response.status==200){
            const data = await response.json()
            data.expires = new Date(new Date().setHours(new Date().getHours()+2))

            localStorage.setItem('userData',JSON.stringify(data))
            setIsLoading(false)
            setLogin(true)
        }

        
    }
    return login ? <Redirect to="/"/> :
     (
        <div>
            <h1 className="title">Welcome To ImageShare</h1>
            <div className="form-container">
                <form onSubmit={onSubmitHandler}>
                    <div className="input-container">
                        <p>email</p>
                        <input onChange={onChangeHandler} name="email" type="email"/>
                    </div>
                    <div className="input-container">
                        <p>password</p>
                        <input onChange={onChangeHandler} name="password" type="password"/>
                    </div>
                    <div className="submit-container">
                        <button type="submit">login</button>
                    </div>
                    <p className="register-message">don't have account ? please register {<Link to="/register">here</Link>}</p>

                </form>
            </div>
            {isLoading && <p style={processingStyle}>processing....</p>}
        </div>
    )
    
}
const processingStyle = {
    textAlign:'center',
    marginTop:'20px',
    fontSize:'2rem'
}

export default withRouter(LoginPage)
