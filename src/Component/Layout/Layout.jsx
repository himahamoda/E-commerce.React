import React, { useContext, useEffect, useState } from 'react'
import Nav from '../Navbar/Nav'
import Home from '../Home/Home'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'



export default function Layout() {

let { setUserToken }= useContext(UserContext)

useEffect(()=> {
if(localStorage.getItem('userToken') !==null)
{
setUserToken(localStorage.getItem('userToken'))
}

},[]);



  let [isUserLoggedIn , setisUserLoggedIn] = useState(false)
  useEffect(()=>{
    if (localStorage.getItem('token') !=null){
      setisUserLoggedIn(true)
    }
  },[])
  return <>
  <Nav/>
  <div className="container">
  <Outlet></Outlet>
  </div>
  </>
}

