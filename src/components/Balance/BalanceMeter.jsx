import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import useApi from '../../hooks/useApi'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const BalanceMeter = ({ list  }) => {

    const { loggedNewUser } = useApi()

    const [totalExpenses, setTotalExpenses] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0)

    
const handleTotal =  () => {
  let total = 0
  let data = list.map(expense => {
      setTotalExpenses(total += expense.total)
  })
  return data
}
    useEffect(() => {
      handleTotal()
      setAvailable(loggedNewUser.balance - totalExpenses)
      const newPercentage = ((loggedNewUser.balance - totalExpenses) / loggedNewUser.balance * 100).toFixed(2)
      setPercentage(newPercentage)
      console.log(list);
    },[list])
 
  return (
   <>
   <div className='balance_meter'>
     <h4>Your Initial Balance: <span>$ {(loggedNewUser.balance.toFixed(2))}</span></h4>
            <CircularProgressbar
            className='meter'
            styles={buildStyles({
                strokeLinecap: 'round',
                pathTransitionDuration: 0.5,
                pathColor: percentage > 0 ? '#3b82f6' : '#f6573b',
                trailColor: percentage > 0 ? 'white' : '#f6573b',
                textColor:percentage > 0 ? '#3b82f6' : '#f6573b'
            })}
            value={percentage}
            text={`${percentage}`}
            >
              </CircularProgressbar> 
            <h4> Surplus: <span className={percentage > 0 ? '' : `negative`}>$ {(available.toFixed(2))}</span></h4>
        </div>
   </>
  )
}

export default BalanceMeter