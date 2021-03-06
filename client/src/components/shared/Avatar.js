import React from 'react'
import { baseUrl } from '../../utils/server'
import './Avatar.css'
const Avatar = ({src}) => {
    const imageSrc = `${baseUrl}/users_images/${src}`
    return (
        <div className="circle-avatar">
            <img src={imageSrc} alt="img"/>
        </div>
    )
}

export default Avatar
