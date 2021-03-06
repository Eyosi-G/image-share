import React from 'react'
import ReactDOM from 'react-dom'
import './ShadowBackground.css'
const ShadowBackground = ({onShadowClickHandler,z_index})=> {
     const content =  <div onClick={(e)=>onShadowClickHandler()} className="shadow-background" style={z_index && {
      zIndex:z_index
}}></div>
      return ReactDOM.createPortal(content,document.getElementById('shadow'))
}

export default  ShadowBackground
