import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

const ApiContext = createContext()
 
const ApiProvider = ({children}) => {

  const [users, setUsers] = useState("");
  const [logged, setLogged] = useState(false)
  const [loggedUser, setLoggedUser] = useState(0)

    useEffect(() => {
      const handleApi = async() => {
        const URL_ENDPOINT = "http://localhost:8888/api"
        const {data} = await axios.get(URL_ENDPOINT);
        console.log(data);
        setUsers(data)
      }
      handleApi()
    },[])
    
  return (
      <ApiContext.Provider
      value={{
        users,
        loggedUser,
        setLoggedUser,
        logged,
        setLogged
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