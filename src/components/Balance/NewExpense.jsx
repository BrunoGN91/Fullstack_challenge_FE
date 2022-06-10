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


const NewExpense = ({editExpense, setEditExpense, editBalance, setEditBalance}) => {

    const navigate = useNavigate()

    const { setRefresh, loggedNewUser, refresh } = useApi();
    const [newExpense, setNewExpense] = useState(false)
    const [category, setCategory] = useState('')
    const [expense, setExpense] = useState({
        description: '',
        value: 0,
    })
    const [expenseUpdate, setExpenseUpdate] = useState({})
    const [newOperation, setNewOperation] = useState(false)
    const [addBalance, setAddBalance] = useState({
        description: '',
        value: 0
      })
      const [newBalance, setNewBalance] = useState(false)
      const [editOldBalance, setEditOldBalance] = useState({})
      const [formErrors, setFormErrors] = useState({})
      const [submitForm, setSubmitForm] = useState(false)

const validateForm = (values) => {
 const errors = {}
  if(values.description === '') {
    errors.description = "Error in Description"
  }

  if(values.value === 0) {
    errors.value = "Error in value"
  }

  return errors
}
    
const handleSubmit = (e) => {
  e.preventDefault()
   setFormErrors(validateForm(expense))
   setSubmitForm(true)

    }
    
useEffect(() => {
    if(Object.keys(formErrors).length === 0 && submitForm) {
      console.log("submit");
      console.log(formErrors);
      console.log(submitForm);
      axios({
           method: "POST",
           url: "http://localhost:8888/api/setNewValue",
           headers: axiosConfig,
           data: JSON.stringify({...expense, category: category, users_fk: loggedNewUser.id})
        }).then(res => {
        
        }).catch(e => {
            console.log("Error on Post Request 'New Expense' ");
        })
        setExpense({
          description: '',
          value: 0,
      })
      setCategory('');
      setNewExpense(false);
      setNewOperation(false);
      setRefresh(true)
      setSubmitForm(false)
   } 
    }, [formErrors])

useEffect(() => {
    setExpenseUpdate({
            id: editExpense.id,
            description: editExpense.description,
            category: editExpense.category,
            value: editExpense.total,
            users_fk: loggedNewUser.id
        })
        }, [editExpense])


const handleChanges = (e) => {
    e.preventDefault()
    console.log(expenseUpdate);
    let {description, value} = expenseUpdate
    if(description === '') {
        alert("Description missing")
    } else if(value === 0) {
        alert("Value Missing")
    } else {
         let URL_OPERATION_ENDPOINT = "http://localhost:8888/api/updateOperation"
       axios({
            method: "POST",
            url: URL_OPERATION_ENDPOINT,
            headers: axiosConfig,
            data: JSON.stringify(expenseUpdate)
         }).then(res => {
             setEditExpense({})
             setExpenseUpdate({})
             setNewOperation(false)

         }).catch(e => {
             console.log("error");
             setEditExpense({})
             setExpenseUpdate({})
         })
        }
        setEditExpense({})
        setExpenseUpdate({})
        setNewExpense(false);
        setRefresh(true)
        setNewOperation(false)

}

    const handleExit = () => {
        
        setExpense({})
        setCategory('')
        setEditExpense({})
        setNewExpense(false);
        setNewOperation(false)
        setNewBalance(false)
        setSubmitForm(false)
        setFormErrors({})
        console.log(formErrors);
      console.log(submitForm);
    }
    
// Adding new balance or editing added balance

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
        setNewOperation(false)
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
    setNewOperation(false)
  }


useEffect(() => {
setEditOldBalance({
            id: editBalance.id,
            description: editBalance.description,
            category: editBalance.category,
            value: editBalance.total,
            users_fk: loggedNewUser.id
        })
        }, [editBalance])

const handleBalanceChanges = (e) => {
e.preventDefault()
if(editOldBalance.description === '') {
  alert("Missing Description")
} else if (editOldBalance.total === 0) {
  alert("Missing Total") 
} else { 
  axios({
    method: "POST",
    url: "http://localhost:8888/api/updateOperation",
    headers: axiosConfig,
    data: JSON.stringify(editOldBalance)
  }).then(res => {
    setEditOldBalance({})
    setEditBalance({})
    setRefresh(true)
    setNewOperation(false)
  }).catch(e => {
    console.log("error post balance");
  }) 
  setRefresh(true)
  setEditOldBalance({})
  setEditBalance({})
  setNewOperation(false)
}
}



  return (
    <>
    <button
    className='expense_button'
    onClick={() => setNewOperation(true)}>
    <img src={Plus} alt="" />
    </button>
    {newOperation ? (
        <>
        <div className='new_operation'>
        <button
        onClick={handleExit}
        className='close_icon'><img src={Cancel} alt="" /></button>
            <div className='operation_option_expense'>
            <input type="checkbox" id="operationCheckBox1" onChange={() => setNewExpense(true)}/>
                <label htmlFor="" for="operationCheckBox1">Expense</label>
                </div>
            <div className='operation_option_balance'>
            <input type="checkbox" id="operationCheckBox2" onChange={() => setNewBalance(true)}/>
                <label htmlFor="" for="operationCheckBox2" >Balance</label>
                </div>
        </div>
        </>
    ) : null}
    {newBalance ? (
        <>
        
          <form 
          className='add_balance'
          action=""
          onSubmit={handleAddBalance}
          >
            <label htmlFor="">Description</label>
            <input type="text" onChange={(e) => {setAddBalance({...addBalance, description: e.target.value})}}/>
              <label htmlFor="">Balance</label>
              <input type="number" onChange={(e) => {setAddBalance({...addBalance, value: e.target.value})}}/>
              <button>Submit</button>
          </form>

        </>
      ) : null}
      {Object.keys(editBalance).length !== 0 ? (
         <>
        
         <form 
         className='add_balance'
         action=""
         onSubmit={handleBalanceChanges}
         >
           <button
       onClick={handleExit}
       className='close_icon'><img src={Cancel} alt="" /></button>
           <label htmlFor="">Description</label>
           <input value={editOldBalance.description} type="text" onChange={(e) => {setEditOldBalance({...editOldBalance, description: e.target.value})}}/>
             <label htmlFor="">Balance</label>
             <input type="number" value={editOldBalance.value} onChange={(e) => {setEditOldBalance({...editOldBalance, value: e.target.value})}}/>
             <button>Submit</button>
         </form>

       </>
      ) : null}
    {newExpense ? (
        <div>   
        <form 
         className='new_expense'
        action=""
        onSubmit={e => handleSubmit(e)}
        >
        <button
        onClick={handleExit}
        className='close_icon'><img src={Cancel} alt="" /></button>
        <label htmlFor="">Description</label>
        <span className='expense_error'>{formErrors.description}</span>
        <input type="text"
        
        onChange={(e) => {setExpense({...expense, description: e.target.value})}}
        />
         <label htmlFor="">Category</label>
         <div className='new_expense_category'>
            <div className='tooltip'>
            <span className='tooltipText'>Home</span>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="home" type="checkbox" name="categoryCheckbox" id="categoryCheckbox1" />
                <label
                className={category === 'home' ? `new_category_selected` : ''}
                for="categoryCheckbox1"
                ><img src={House} alt="" /></label>
                </div>
            <div className='tooltip'>
            <span className='tooltipText'>Health</span>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="health" type="checkbox" name="categoryCheckbox" id="categoryCheckbox2" />
                <label
                className={category  === 'health' ? `new_category_selected` : ''}
                for="categoryCheckbox2"
                ><img src={Health} alt="" /></label>
                </div>
            <div className='tooltip'>
            <span className='tooltipText'>Savings</span>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="savings" type="checkbox" name="categoryCheckbox" id="categoryCheckbox3" />
                <label
                className={category  === 'savings' ? `new_category_selected` : ''}
                for="categoryCheckbox3"
                ><img src={Savings} alt="" /></label>
            </div>
            <div className='tooltip'>
            <span className='tooltipText'>Food</span>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="food" type="checkbox" name="categoryCheckbox" id="categoryCheckbox4" />
                <label
                className={category  === 'food' ? `new_category_selected` : ''}
                for="categoryCheckbox4"
                ><img src={Food} alt="" /></label>
            </div>
            <div className='tooltip'>
            <span className='tooltipText'>Other</span>
            <input 
                onClick={(e) => setCategory(e.target.value)}
                value="other" type="checkbox" name="categoryCheckbox" id="categoryCheckbox5" />
                <label
                className={category  === 'other' ? `new_category_selected` : ''}
                for="categoryCheckbox5"
                ><img src={Other} alt="" /></label>
            </div>
           
        </div>
        <label htmlFor="">Value</label>
        <span className='expense_error'>{formErrors.value}</span>
        <input
        
        type="number" 
        onChange={(e) => {setExpense({...expense, value: e.target.value})}}
        />
        <button type="submit">
            Submit
        </button>
        </form>    
            
        </div>
    ) : null}
    {Object.keys(editExpense).length !== 0 ? (
        <form 
        className='new_expense'
       action=""
       onSubmit={handleChanges}
       >
       <button
       onClick={handleExit}
       className='close_icon'><img src={Cancel} alt="" /></button>
       <label htmlFor="">Description</label>
       <input type="text"
       value={expenseUpdate.description}
       onChange={(e) => setExpenseUpdate({...expenseUpdate, description: e.target.value})}
       />
        <label htmlFor="">Category</label>
        <div className='new_expense_category' >
           <input 
               onClick={(e) => setExpenseUpdate({...expenseUpdate, category: e.target.value})}
               value="house" type="checkbox" name="categoryCheckbox" id="categoryCheckbox1" />
               <label
               className={expenseUpdate.category === 'house' ? `new_category_selected` : ''}
               for="categoryCheckbox1"
               ><img src={House} alt="" /></label>
           <input 
               onClick={(e) => setExpenseUpdate({...expenseUpdate, category: e.target.value})}
               value="health" type="checkbox" name="categoryCheckbox" id="categoryCheckbox2" />
               <label
               className={expenseUpdate.category === 'health' ? `new_category_selected` : ''}
               for="categoryCheckbox2"
               ><img src={Health} alt="" /></label>
           <input 
               onClick={(e) => setExpenseUpdate({...expenseUpdate, category: e.target.value})}
               value="savings" type="checkbox" name="categoryCheckbox" id="categoryCheckbox3" />
               <label
               className={expenseUpdate.category === 'savings' ? `new_category_selected` : ''}
               for="categoryCheckbox3"
               ><img src={Savings} alt="" /></label>
           <input 
               onClick={(e) => setExpenseUpdate({...expenseUpdate, category: e.target.value})}
               value="food" type="checkbox" name="categoryCheckbox" id="categoryCheckbox4" />
               <label
               className={expenseUpdate.category === 'food' ? `new_category_selected` : ''}
               for="categoryCheckbox4"
               ><img src={Food} alt="" /></label>
           <input 
               onClick={(e) => setExpenseUpdate({...expenseUpdate, category: e.target.value})}
               value="other" type="checkbox" name="categoryCheckbox" id="categoryCheckbox5" />
               <label
               className={expenseUpdate.category === 'other' ? `new_category_selected` : ''}
               for="categoryCheckbox5"
               ><img src={Other} alt="" /></label>
          
       </div>
       <label htmlFor="">Value</label>
       <input 
       value={expenseUpdate.value}
       type="number" 
       onChange={(e) => {setExpenseUpdate({...expenseUpdate, value: e.target.value})}}
       />
       <button>
           Save changes
       </button>
       </form>    
           
    ) : null}
    </>
  )
}

export {

}

export default NewExpense