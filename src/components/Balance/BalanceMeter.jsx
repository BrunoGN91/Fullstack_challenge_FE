import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import useApi from '../../hooks/useApi'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const BalanceMeter = ({ refresh }) => {
    const { loggedNewUser } = useApi()
    const logged = sessionStorage.getItem("token");

 
  return (
   <>
   <div className='balance_meter'>
            <CircularProgressbar
            styles={buildStyles({
                pathColor:'#3b82f6',
                textColor:'#3b82f6'
            })}
            text={`${loggedNewUser.balance} %`}
            value={loggedNewUser}
            >{loggedNewUser}</CircularProgressbar> 
        </div>
   </>
  )
}

export default BalanceMeter