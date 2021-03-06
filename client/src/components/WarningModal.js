import React from 'react'
import ReactDOM from 'react-dom'
import './WarningModal.css'
const WarningModal = ({message,deleteConfirmHandler}) => {
    const content =  (
        
                        <div className="warning-modal-wrapper">
                                {message}
                                <div className="ok-button-wrapper">
                                        <button onClick={(e)=>deleteConfirmHandler()} className="ok-button">Ok</button>
                                </div>
                        </div>
                     )
    return ReactDOM.createPortal(content,document.getElementById('modal'))
}

export default WarningModal
