import React from 'react'
import {Link} from 'react-router-dom'
import useApi from '../hooks/useApi'

const Home = () => {

  
  return (
    <>
    <div className='home'>
    <h2>BalanceMeter</h2>
    <h3>Check your balance and keep track of your expenses </h3>
    
    <div className='home_links'>
    <Link to='/login'>Log in</Link> <Link to='/register'>Register</Link>
    </div>
    </div>
    </>
  )
}

export default Home