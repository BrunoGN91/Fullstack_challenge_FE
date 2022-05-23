import React from 'react'
import BalanceMeter from './BalanceMeter'
import NewExpense from './NewExpense'
import OperationsList from './OperationsList'
import useApi from '../../hooks/useApi'

const BalanceManager = () => {


const { loggedUser } = useApi()

  return (
    <>
    <div className='balance'>
      <div className='balance_meter'>
      <BalanceMeter />
      </div>
      <div className='expenses'>
      <NewExpense />
      <OperationsList />
      </div>
    </div>
    </>
  )
}

export default BalanceManager