import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import useApi from '../../hooks/useApi'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Spinner from './Spinner';
import Cancel from "../../../public/images/cancel.png"

const axiosConfig = {
  headers: {
      'Content-Type' : 'application/json',
      "Accept": "Token",
      "Access-Control-Allow-Origin": "*",

  }
};


const BalanceMeter = ({ refresh, list, spinner,setRefresh }) => {

    const { loggedNewUser } = useApi()
    
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0)
    const [editInitialBalance, setEditInitialBalance] = useState(false)
    const [updatedInitialBalance, setUpdatedInitialBalance] = useState(loggedNewUser.balance)


    useEffect(() => {
      
     try {
        console.log(list);
        setTotalExpenses(0)
        setTotalBalance(loggedNewUser.balance)
        // setAvailable(totalBalance - totalExpenses)
        // setPercentage(((available / totalBalance) * 100).toFixed(0))

         if(list.length !== 0) {
          list.map(operation => {
            let initialBalance = loggedNewUser.balance
            let total = 0
            switch (operation.category){
  
              case 'add_balance':
                setTotalBalance(initialBalance += operation.total);
                console.log(totalBalance);
                break;
              default:
                setTotalExpenses(total += operation.total)
                console.log(totalExpenses);
                break;
            }
          })
         }
       setAvailable(totalBalance - totalExpenses)
     } catch (error) {
       console.log("Error on balance loadUp");
     }
        
    },[list])

useEffect(() => {
      setPercentage(((available / totalBalance) * 100).toFixed(0))
  }, [available, editInitialBalance])


  const handleEditInitialBalance = (e) => {
    e.preventDefault()
    axios({
      method: "PUT",
      url: 'http://localhost:8888/api/editInitialBalance',
      headers: axiosConfig,
      data: JSON.stringify({
        newBalance: updatedInitialBalance,
        user: loggedNewUser.id
      })
    }).then(res => {
      setRefresh(true)
      setEditInitialBalance(false)
      setUpdatedInitialBalance(updatedInitialBalance)
    })
    setUpdatedInitialBalance(updatedInitialBalance)
    setRefresh(true)
    setEditInitialBalance(false)
  }
  const handleExit = () => {
    setEditInitialBalance(false)
}
  return (
   <>
   <div className='balance_meter'>
     <div className='balance_info'>
     <h3>Initial Balance <span>$ {(loggedNewUser.balance.toFixed(2))}</span></h3>
     <button onClick={() => setEditInitialBalance(true)}>Edit initial Balance</button>
      </div>
      {editInitialBalance ? (
        <>
        <form 
         className='add_balance'
         action=""
         onSubmit={handleEditInitialBalance}
         >
           <button
       onClick={handleExit}
       className='close_icon'><img src={Cancel} alt="" /></button>
             <label htmlFor="">Initial Balance</label>
             <input type="number" value={updatedInitialBalance} onChange={(e) => setUpdatedInitialBalance(Number(e.target.value))} />
             <button>Submit</button>
         </form>
        </>
      ) : null}
     <div className='meter_box'>
            <CircularProgressbar
            className='meter'
            styles={buildStyles({
                strokeLinecap: 'round',
                pathTransitionDuration: 0.5,
                pathColor: percentage > 0 ? '#3b82f6' : '#f6573b',
                trailColor: percentage > 0 ? 'white' : '#f6573b',
                textColor:percentage > 0 ? '#3b82f6' : '#f6573b',
                
                
            })}
            value={percentage}
            text={spinner ? `${percentage} %` : null}
            >
              </CircularProgressbar>
              {!spinner ? <Spinner /> : null}
              </div>
              <div className='balance_info'>
            <h4> Total Balance</h4>
            <span className={totalBalance > 0 ? '' : `negative`}>$ {(totalBalance.toFixed(2))}</span>
            <h4> Surplus</h4>
            <span className={percentage > 0 ? '' : `negative`}>$ {(available.toFixed(2))}</span>
            </div>
        </div>
   </>
  )
}

export default BalanceMeter