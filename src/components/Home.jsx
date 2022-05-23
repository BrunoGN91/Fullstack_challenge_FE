import React from 'react'
import {Link} from 'react-router-dom'
import useApi from '../hooks/useApi'

const Home = () => {

  const { loggedUser } = useApi()
  console.log();
  
  return (
    <>
    <h2>Control your Balance</h2>
    <h3>Check your balance and keep track of your expenses </h3>
    <Link to='/login'>Log in</Link> <Link to='/register'>Register</Link>
    </>
  )
}

export default Home