import React from 'react'
import AppHeader from '../components/AppHeader'
import AppNavbar from '../components/AppNavbar'
import { Outlet } from 'react-router-dom'
import AppFooter from '../components/AppFooter'


function AppLayout( {products , carts , setToken}) {
  return (
    <>
        <AppHeader/>
        <AppNavbar products={products} carts={carts} setToken={setToken}/>
        <Outlet/>
        <AppFooter/>
    </>
  )
}

export default AppLayout