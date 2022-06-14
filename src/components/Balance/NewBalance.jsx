import axios from 'axios'
import React, {useState} from 'react'
import useApi from '../../hooks/useApi';




const axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };

const NewBalance = () => {

    const { setLoggedNewUser, loggedNewUser } = useApi()

    const [balance, setBalance] = useState(0)
    const logged = sessionStorage.getItem("token")

    const handleBalance = (e) => {
        e.preventDefault()
        if(balance === 0) {
            alert("you need to add a balance to continue")
        } else {
            
            axios({
                method: 'POST',
                url: process.env.VITE_URL || "http://localhost:8888/api/setNewBalance",
                headers: axiosConfig,
                data: JSON.stringify({
                    total: balance,
                    id: logged
                })
            }).then(res => {
                setLoggedNewUser(res.data)
            })
        }
    }

  return (
    <>
    <div className='new_balance'>
    <h2>Add your balance to get started!</h2>
    <form 
    action=""
    onSubmit={handleBalance}
    >
        <label htmlFor="">Balance: </label>
        <input type="number" onChange={(e) => { setBalance(e.target.value)}}/>
        <button>Submit</button>
    </form>
    </div>
    </>
  )
}

export default NewBalance