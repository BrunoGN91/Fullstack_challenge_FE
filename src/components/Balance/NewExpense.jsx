import React, {useState, useEffect} from 'react'
import useApi from '../../hooks/useApi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Plus from "../../../public/images/plus.png"
import Cancel from "../../../public/images/cancel.png"


// Category icons
import House from "../../../public/images/home.png"
import Food from "../../../public/images/dish.png"
import Health from "../../../public/images/heartbeat.png"
import Savings from "../../../public/images/piggy-bank.png"
import Other from "../../../public/images/more.png"



const axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };


const NewExpense = () => {

    const navigate = useNavigate()

    const { setRefresh, loggedNewUser, refresh } = useApi();
    

    const [newExpense, setNewExpense] = useState(false)
    const [category, setCategory] = useState('')
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
            data: JSON.stringify({...expense, category: category, users_fk: loggedNewUser.id})
         }).then(res => {
            setExpense({
                description: '',
                value: 0,
            })
            setCategory('')
         }).catch(e => {
             console.log("error");
         })
        }
        setCategory('')
        setNewExpense(false);
        setRefresh(true)
    }

    const handleExit = () => {
        setCategory('')
        setNewExpense(false);
        setRefresh(true)
    }

  return (
    <>
    <button
    className='expense_button'
    onClick={() => setNewExpense(true)}>
    <img src={Plus} alt="" />
    </button>
    {newExpense ? (
        <div>
            
        <form 
         className='new_expense'
        action=""
        onSubmit={handleSubmit}
        >
        <button
        onClick={handleExit}
        className='close_icon'><img src={Cancel} alt="" /></button>
        <label htmlFor="">Description</label>
        <input type="text" 
        onChange={(e) => {setExpense({...expense, description: e.target.value})}}
        />
         <label htmlFor="">Category</label>
         <div className='new_expense_category' >
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="house" type="checkbox" name="categoryCheckbox" id="categoryCheckbox1" />
                <label
                className={category === 'house' ? `new_category_selected` : ''}
                for="categoryCheckbox1"
                ><img src={House} alt="" /></label>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="health" type="checkbox" name="categoryCheckbox" id="categoryCheckbox2" />
                <label
                className={category === 'health' ? `new_category_selected` : ''}
                for="categoryCheckbox2"
                ><img src={Health} alt="" /></label>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="savings" type="checkbox" name="categoryCheckbox" id="categoryCheckbox3" />
                <label
                className={category === 'savings' ? `new_category_selected` : ''}
                for="categoryCheckbox3"
                ><img src={Savings} alt="" /></label>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="food" type="checkbox" name="categoryCheckbox" id="categoryCheckbox4" />
                <label
                className={category === 'food' ? `new_category_selected` : ''}
                for="categoryCheckbox4"
                ><img src={Food} alt="" /></label>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="other" type="checkbox" name="categoryCheckbox" id="categoryCheckbox5" />
                <label
                className={category === 'other' ? `new_category_selected` : ''}
                for="categoryCheckbox5"
                ><img src={Other} alt="" /></label>
           
        </div>
        <label htmlFor="">Value</label>
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