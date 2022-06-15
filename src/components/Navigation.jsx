import React, {useEffect, useState} from 'react'
import {Routes, Route, Link, BrowserRouter, useNavigate} from "react-router-dom"
import Register from './Register'
import Home from './Home'
import Login from './Login'
import useApi from '../hooks/useApi'
import BalanceManager from './Balance/BalanceManager'
import NotFound from './NotFound'
import axios from 'axios'

const axiosConfig = {
  headers: {
      'Content-Type' : 'application/json',
      "Accept": "Token",
      "Access-Control-Allow-Origin": "*",

  }
};

const Navigation = () => {



  const { loggedNewUser, setLoggedNewUser, setLoggedUser, setLoggedOut, loggedOut, refresh, loggedUser } = useApi()

  
  const logged = sessionStorage.getItem("token")

  useEffect(() => {

    axios({
      method: 'GET',
      url: `${import.meta.env.VITE_API_URL}/users/${logged}`,
      headers: axiosConfig,
  }).then(res => {
     setLoggedUser(res.data.id)
     setLoggedNewUser(res.data)
     setLoggedOut(true)
}).catch(e => {
  console.log("error in navigation");
})
  
  }, [])

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    setLoggedOut(false)
  }

  return (
    <BrowserRouter>
      <div className='nav_bar'>
          <Link to="/">Home</Link>
          {loggedOut ? (
            <Link
            to="/"
            onClick={handleLogOut}
            >Log Out</Link>
          ) : <Link to="/register">Register</Link>}
      </div>
    <Routes>
        <Route exact path='/' component={Navigation} element={loggedNewUser !== null ? <Home /> : null} /> 
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={!loggedOut ? <Login/> : <NotFound />} />
        <Route path='/balance' element={loggedNewUser.balance !== undefined ? <BalanceManager/> : <NotFound />} />

    </Routes>
    </BrowserRouter>
  )
}

export default Navigation