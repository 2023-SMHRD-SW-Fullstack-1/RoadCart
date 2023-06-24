import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogOutPage = ({setIsLoggendIn}) => {

    const nav = useNavigate()
    window.sessionStorage.clear()
    setIsLoggendIn(false)
    
    return nav('/')
}

export default LogOutPage