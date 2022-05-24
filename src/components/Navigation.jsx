import React from 'react'
import {Routes, Route, Link, BrowserRouter, useNavigate} from "react-router-dom"
import Register from './Register'
import Home from './Home'
import Login from './Login'
import useApi from '../hooks/useApi'
import BalanceManager from './Balance/BalanceManager'
import NotFound from './NotFound'


const Navigation = () => {

  const { loggedUser } = useApi()
 
  const logged = sessionStorage.getItem("token")

  const handleLogOut = () => {
    window.location.reload(true)
    sessionStorage.removeItem("token");
   
  }

  return (
    <BrowserRouter>
      <div className='nav_bar'>
          <Link to="/">Home</Link>
          {logged !== null ? (
            <Link
            onClick={handleLogOut}
            to="/"
            >Log Out</Link>
          ) : <Link to="/register">Register</Link>}
      </div>


    <Routes>
        <Route exact path='/' component={Navigation} element={<Home />} /> 
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/balance' element={logged !== 0 ? <BalanceManager/> : <NotFound />} />

    </Routes>
    </BrowserRouter>
  )
}

export default Navigation