import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

const ApiContext = createContext()
 
const ApiProvider = ({children}) => {

  const [users, setUsers] = useState("");
  const [loggedUser, setLoggedUser] = useState(0)
  const [loggedNewUser, setLoggedNewUser] = useState({})
  const [refresh, setRefresh] = useState(false)
  
  return (
      <ApiContext.Provider
      value={{
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