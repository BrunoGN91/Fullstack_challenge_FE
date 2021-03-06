import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

const ApiContext = createContext()


const axiosConfig = {
  headers: {
      'Content-Type' : 'application/json',
      "Accept": "Token",
      "Access-Control-Allow-Origin": "*",

  }
};

 
const ApiProvider = ({children}) => {

  const [users, setUsers] = useState("");
  const [loggedUser, setLoggedUser] = useState(0)
  const [loggedNewUser, setLoggedNewUser] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
 
  

  return (
      <ApiContext.Provider
      value={{
        loggedOut,
        setLoggedOut,
        users,
        loggedUser,
        setLoggedUser,
        setLoggedNewUser,
        loggedNewUser,
        refresh,
        setRefresh
      }}
      >
    {children}
    </ApiContext.Provider>
  )
}

export {
  ApiProvider
}

export default ApiContext