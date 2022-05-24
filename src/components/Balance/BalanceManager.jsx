import React, {useEffect, useState} from 'react'
import BalanceMeter from './BalanceMeter'
import NewExpense from './NewExpense'
import OperationsList from './OperationsList'
import useApi from '../../hooks/useApi'
import NewBalance from './NewBalance'
import { useNavigate } from 'react-router-dom'

const BalanceManager = () => {

const navigate = useNavigate()
const { loggedNewUser } = useApi()
const logged = sessionStorage.getItem("token")
const [refresh, setRefresh] = useState(false)

useEffect(() => {
  if(logged === null) {
    navigate('/')
  }
},[])
console.log(loggedNewUser);
  return (
    <>
    {loggedNewUser.balance === 0 ? (
      <NewBalance />
    ) : (
      <div className='balance'>
      <BalanceMeter
      refresh={refresh}
      />
      <NewExpense
      setRefresh={setRefresh}
      />
      <OperationsList
      refresh={refresh}
      setRefresh={setRefresh}
      />
    </div>
    )}
 
    </>
  )
}

export default BalanceManager