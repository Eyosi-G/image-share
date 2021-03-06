import React from 'react'
import './Card.css'
const Card = ({children,height}) => {
    return (
        <div style={height && {
            height:height 
        }} className="card" >
            {children}
        </div>
    )
}

export default Card
