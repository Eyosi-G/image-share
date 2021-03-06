import React from 'react'
import './404.css'
const Page404 = () => {
    const imageAddress = "https://cdn.dribbble.com/users/1963449/screenshots/5915645/404_not_found.png";

    return (
        <div className="notfound-container">
            <img src={imageAddress}/>
        </div>
    )
}

export default Page404
