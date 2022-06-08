import React from 'react'
import {Routes, Route, Link, BrowserRouter, useNavigate} from "react-router-dom"
import Register from './Register'
import Home from './Home'
import Login from './Login'
import useApi from '../hooks/useApi'
import BalanceManager from './Balance/BalanceManager'
import NotFound from './NotFound'


const Navigation = () => {

  const { loggedNewUser } = useApi()
 
  const logged = sessionStorage.getItem("token")

  const handleLogOut = () => {
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
        <Route exact path='/' component={Navigation} element={loggedNewUser !== null ? <Home /> : null} /> 
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/balance' element={loggedNewUser.balance !== undefined ? <BalanceManager/> : <NotFound />} />

    </Routes>
    </BrowserRouter>
  )
}

export default Navigation