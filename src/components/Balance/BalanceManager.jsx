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
const { loggedNewUser } = useApi()
const logged = sessionStorage.getItem("token")

const [refresh, setRefresh] = useState(false)
const [totalExpenses, setTotalExpenses] = useState(0)
const [list, setList] = useState([])
const [percentage, setPercentage] = useState(0)
const [available, setAvailable] = useState(0)

const handleTotal = () => {
  let total = 0
  let data = list.map(expense => {
      setTotalExpenses(total += expense.total)
  })
  return data
}

useEffect(() => {
  axios({
    method: "GET",
    url: `http://localhost:8888/api/usersOperations/${loggedNewUser.id}`,
    headers: axiosConfig
  }).then(data => {
    setList(data.data)
  })
  handleTotal()
},[])

useEffect(() => {
  axios({
        method: "POST",
        url: "http://localhost:8888/api/setOperationList",
        headers: axiosConfig,
        data: JSON.stringify(logged)
    }).then(res => {
      setList(res.data)
      handleTotal()
    })
    setRefresh(false);
},[refresh])

useEffect(() => {
  setAvailable(loggedNewUser.balance - totalExpenses)
  const newPercentage = ((loggedNewUser.balance - totalExpenses) / loggedNewUser.balance * 100).toFixed(2)
  setPercentage(newPercentage)
  
},[totalExpenses])


  return (
    <>
    {loggedNewUser.balance === 0 ? (
      <NewBalance />
    ) : (
      <div className='balance'>
      <BalanceMeter
      percentage={percentage}
      available={available}
      totalExpenses={totalExpenses}
      refresh={refresh}
      />
      <NewExpense
      setRefresh={setRefresh}
      />
      <OperationsList
      list={list}
      setTotalExpenses={setTotalExpenses}
      refresh={refresh}
      setRefresh={setRefresh}
      />
    </div>
    )}
 
    </>
  )
}

export default BalanceManager