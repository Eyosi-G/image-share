import React from 'react'
import { Redirect } from 'react-router-dom'
import logout from '../utils/logout'

const LogoutPage = () => {
    logout()
    return <Redirect to="/login"/>
}

export default LogoutPage
