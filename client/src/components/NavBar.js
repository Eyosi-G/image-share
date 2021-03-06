import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import './NavBar.css'
import Avatar from './shared/Avatar'
const NavBar = ({post,home}) => {
    useEffect(()=>{
        const userData = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))
        setUserData(userData)
    },[])
    const [isMenuOpened, setMenuOpen] = useState(false)
    const [userData,setUserData] = useState(undefined)
    const onMouseEnterHandler = (e)=>{
        setMenuOpen(true)
    }
    const onMouseLeaveHandler = (e)=>{
        setMenuOpen(false)
    }
    return (
        <div className="navbar-container">
            
                    <ul className="navlist-container">
                        { !home &&  <li><Link to="/">Home</Link></li>}
                        { !post && userData && <li><Link to="/post-image">Post-Image</Link></li>}
                        {!userData && <li><Link to="/login">Login</Link></li>}
                    </ul>
            <div style={menuWrapperStyle} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
                {isMenuOpened && <Menu home={home} post={post}/>}
                {userData && <Avatar src={userData.image}/>}
            </div>
            
        </div>
    )
}

const menuWrapperStyle = {
    position:"relative"
}

export default NavBar
