import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainLayout = ({isLoggendIn}) => {
  return (
    <>
        <Header isLoggendIn={isLoggendIn}/>
        <Outlet/>
    </>
  )
}

export default MainLayout