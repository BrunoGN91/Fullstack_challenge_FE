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


const BalanceMeter = ({ refresh, list, spinner, setSpinner, setRefresh }) => {

    const { loggedNewUser } = useApi()

    const [totalExpenses, setTotalExpenses] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [available, setAvailable] = useState(0);
    const [addBalance, setAddBalance] = useState({
      description: '',
      value: 0
    })
    const [newBalance, setNewBalance] = useState(false)
    

    
const handleTotal = () => {
  let total = 0
  let data = list.map(expense => {
    if(expense.category === "add_balance") {
      setTotalExpenses(total -= expense.total)
    } else {
      setTotalExpenses(total += expense.total)
    }
     
  })
  return data
}
    useEffect(() => {
     try {
       const handleSum = async () => {
        handleTotal()
        setAvailable(loggedNewUser.balance - totalExpenses)
        const newPercentage = ((loggedNewUser.balance - totalExpenses) / loggedNewUser.balance * 100).toFixed(0)
        setPercentage(newPercentage)
       }
       handleSum()
     } catch (error) {
       
     }
        
    },[list])

    const handleAddBalance = () => {
      if(newBalance.description === '') {
        alert("Missing Description")
      } else if (newBalance.total === 0) {
        alert("Missing Total") 
      } else {
        axios({
          method: "POST",
          url: "http://localhost:8888/api/setNewValue",
          headers: axiosConfig,
          data: JSON.stringify({
            ...addBalance,
            category: "add_balance",
            users_fk: loggedNewUser.id
          })
        }).then(res => {
          setAddBalance({
            description: '',
            value: 0
          })
          setRefresh(true)
          setNewBalance(false)
        }).catch(e => {
          console.log("error");
        })
      }
      setAddBalance({
        description: '',
        value: 0
      })
      setRefresh(true)
      setNewBalance(false)
    }

    const handleExit = () => {
      setNewBalance(false)
    }

  return (
   <>
   <div className='balance_meter'>
     <div className='balance_info'>
     <h4>Your Initial Balance: <span>$ {(loggedNewUser.balance.toFixed(2))}</span></h4>
      <button
      onClick={() => setNewBalance(true)}
      >Add to your balance</button>
      {newBalance ? (
        <>
        
          <form 
          className='add_balance'
          action=""
          onSubmit={handleAddBalance}
          >
            <button
        onClick={handleExit}
        className='close_icon'><img src={Cancel} alt="" /></button>
            <label htmlFor="">Description</label>
            <input type="text" onChange={(e) => {setAddBalance({...addBalance, description: e.target.value})}}/>
              <label htmlFor="">Balance</label>
              <input type="number" onChange={(e) => {setAddBalance({...addBalance, value: e.target.value})}}/>
              <button>Submit</button>
          </form>

        </>
      ) : null}
      </div>
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
            <h4> Surplus: <span className={percentage > 0 ? '' : `negative`}>$ {(available.toFixed(2))}</span></h4>
        </div>
   </>
  )
}

export default BalanceMeter