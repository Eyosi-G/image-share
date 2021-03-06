import React from 'react'
import './Error.css'
const Error = ({children}) => {
    return (
        <p className="error">
            {children}
        </p>
    )
}

export default Error
