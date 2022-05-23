import React, {useContext} from 'react'
import useApi from '../../hooks/useApi'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const BalanceMeter = () => {
    const { } = useApi()

  return (
   <>
   <div>
            <CircularProgressbar
            styles={buildStyles({
                pathColor:'#3b82f6',
                textColor:'#3b82f6'
            })}
            
            value={100}
            >{100}</CircularProgressbar> 
        </div>
   </>
  )
}

export default BalanceMeter