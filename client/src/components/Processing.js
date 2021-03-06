import React from 'react'
import ReactDOM from 'react-dom'
import './Processing.css'
const Processing = () => {
    const imageSrc = "https://oe7k5kw772-flywheel.netdna-ssl.com/wp-content/themes/dt-the7-child/preloader-sm.gif"
    const content =  (
        
                        <div className="processing-modal-wrapper">
                                <img className="rotate-wrapper" src={imageSrc}/>
                        </div>
                     )
    return ReactDOM.createPortal(content,document.getElementById('modal'))
}

export default Processing
