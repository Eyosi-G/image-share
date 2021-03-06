import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import logout from '../utils/logout'

const Authenticated = ({Component}) => {
    const userData = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))
    if(userData){
      const {expires} = userData
      const now = new Date()
      if(now > new Date(Date.parse(expires))){
        logout()
        return <Redirect to="/login"/>
      }
      return <Component/>
    }
    return <Redirect to="/login"/>
}

export default Authenticated
