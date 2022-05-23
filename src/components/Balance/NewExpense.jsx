import React, {useState, useEffect} from 'react'
import useApi from '../../hooks/useApi'
import axios from 'axios'

const axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };


const NewExpense = () => {

    const { loggedUser } = useApi()

    const [newExpense, setNewExpense] = useState(false)
    const [expense, setExpense] = useState({
        description: '',
        value: 0,
        
    })

    useEffect(() => {
        if(newExpense) {
            document.body.style.backgroundColor = "#414141"
        } else {
            document.body.style.backgroundColor = "#58C1F5"
        }
    },[newExpense])

const handleSubmit = (e) => {
    e.preventDefault()
    let {description, value} = expense

    if(description === '') {
        alert("Description missing")
    } else if(value === 0) {
        alert("Value Missing")
    } else {
         let URL_OPERATION_ENDPOINT = "http://localhost:8888/api/setNewValue"
       axios({
            method: "POST",
            url: URL_OPERATION_ENDPOINT,
            headers: axiosConfig,
            data: JSON.stringify({...expense, users_fk: loggedUser})
         }).then(res => {
             return res
         }).catch(e => {
             console.log("error");
         })
        
        }
        setNewExpense(false);
        setExpense({
            description: '',
            value: 0
        })
    }

  return (
    <>
    <button
    className='expense_button'
    onClick={() => setNewExpense(true)}>
    New Expense 
    </button>
    {newExpense ? (
        <div className='new_expense'>
        <form 
        action=""
        onSubmit={handleSubmit}
        >
        <label htmlFor="">Description: </label>
        <input type="text" 
        onChange={(e) => {setExpense({...expense, description: e.target.value})}}
        />
        <label htmlFor="">Value: </label>
        <input 
        type="number" 
        onChange={(e) => {setExpense({...expense, value: e.target.value})}}
        />
        <button>
            Submit
        </button>
        </form>    
            
        </div>
    ) : null}
    </>
  )
}

export default NewExpense