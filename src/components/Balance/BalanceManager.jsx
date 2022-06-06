import React, {useEffect, useState} from 'react'
import BalanceMeter from './BalanceMeter'
import NewExpense from './NewExpense'
import OperationsList from './OperationsList'
import useApi from '../../hooks/useApi'
import NewBalance from './NewBalance'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const axiosConfig = {
  headers: {
      'Content-Type' : 'application/json',
      "Accept": "Token",
      "Access-Control-Allow-Origin": "*",

  }
};

const BalanceManager = () => {

const navigate = useNavigate()
const { loggedNewUser, refresh, setRefresh, loggedUser, setLoggedNewUser } = useApi()
const logged = sessionStorage.getItem("token")
const [list, setList] = useState([])
const [spinner, setSpinner] = useState(false);
const [edit, setEdit] = useState({})



useEffect(() => {
  const handleInitialFetch = async () => {
    try {
      let data = await axios({
        method: "GET",
        url: `http://localhost:8888/api/usersOperations/${loggedNewUser.id}`,
        headers: axiosConfig
      })
      setList(data.data)
      console.log();
    } catch (error) {
    }
  }
  handleInitialFetch()
  
},[])

useEffect(() => {
  setTimeout(() => {
    setSpinner(true)
    const handleAsyncPost = async () => {
      try {
          let awaitData = await axios({
            method: "POST",
            url: "http://localhost:8888/api/setOperationList",
            headers: axiosConfig,
            data: JSON.stringify(logged)
        })
        console.log(awaitData);
        setList(awaitData.data)
        return awaitData
      } catch (error) {
      }
    }
    handleAsyncPost()
    setRefresh(false);
  },500)
setSpinner(false)
},[refresh])

useEffect(() => {
  setTimeout(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8888/api/users/${loggedUser}`,
      headers: axiosConfig,
        }).then(res => {
      
      console.log(res);
      setLoggedNewUser(res.data)
  })
  },500)

},[refresh])


  return (
    <>
    {loggedNewUser.balance === 0 ? (
      <NewBalance />
    ) : (
      <div className='balance'>
      <BalanceMeter
      setRefresh={setRefresh}
      spinner={spinner}
      setSpinner={setSpinner}
      list={list}
      refresh={refresh}
      />
      <NewExpense
      edit={edit}
      setEdit={setEdit}
      spinner={spinner}
      setRefresh={setRefresh}
      />
      <OperationsList
      setEdit={setEdit}
      spinner={spinner}
      list={list}
      refresh={refresh}
      setRefresh={setRefresh}
      />
    </div>
    )}
 
    </>
  )
}

export default BalanceManager