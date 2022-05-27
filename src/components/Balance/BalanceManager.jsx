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
const { loggedNewUser, refresh, setRefresh } = useApi()
const logged = sessionStorage.getItem("token")

const [list, setList] = useState([])



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
  const handleAsyncPost = async () => {
    try {
        let awaitData = await axios({
          method: "POST",
          url: "http://localhost:8888/api/setOperationList",
          headers: axiosConfig,
          data: JSON.stringify(logged)
      })
      setList(awaitData.data)
      return awaitData
    } catch (error) {
    }
  }
  handleAsyncPost()
  setRefresh(false);
},[refresh])




  return (
    <>
    {loggedNewUser.balance === 0 ? (
      <NewBalance />
    ) : (
      <div className='balance'>
      <BalanceMeter
      list={list}
      refresh={refresh}
      />
      <NewExpense
      setRefresh={setRefresh}
      />
      <OperationsList
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