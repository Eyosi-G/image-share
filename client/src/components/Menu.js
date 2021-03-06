import React from 'react'
import Card from './shared/Card'
import './Menu.css'
import { Link } from 'react-router-dom'
const Menu = ({post,home}) => {
    return (
        <div className="option-container">
                <ul>
                    {(post || home) && <li><Link to="/my-posts">My-Posts</Link></li>}
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
        </div>
    )
}

export default Menu
