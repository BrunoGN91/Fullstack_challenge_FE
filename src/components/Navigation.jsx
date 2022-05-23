import React from 'react'
import {Routes, Route, Link, BrowserRouter,Navigate} from "react-router-dom"
import Register from './Register'
import Home from './Home'
import Login from './Login'
import useApi from '../hooks/useApi'
import BalanceManager from './Balance/BalanceManager'
import NotFound from './NotFound'


const Navigation = () => {

  const { loggedUser, logged } = useApi()

  return (
    <BrowserRouter>
      <div className='nav_bar'>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
      </div>


    <Routes>
        <Route exact path='/' component={Navigation} element={<Home />} /> 
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/balance' element={logged ? <BalanceManager/> : <NotFound />} />

    </Routes>
    </BrowserRouter>
  )
}

export default Navigation