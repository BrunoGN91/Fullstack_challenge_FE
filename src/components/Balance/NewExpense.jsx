import React, {useState, useEffect} from 'react'
import useApi from '../../hooks/useApi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };


const NewExpense = ({setRefresh}) => {

    const navigate = useNavigate()

    const {  } = useApi();
    const logged = sessionStorage.getItem("token")

    const [newExpense, setNewExpense] = useState(false)
    const [expense, setExpense] = useState({
        description: '',
        value: 0,
        
    })


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
            data: JSON.stringify({...expense, users_fk: logged})
         }).then(res => {
             return res
         }).catch(e => {
             console.log("error");
         })
         setNewExpense(false);
         setExpense({
             description: '',
             value: 0
         });
         setRefresh(true)
        }
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

export {

}

export default NewExpense