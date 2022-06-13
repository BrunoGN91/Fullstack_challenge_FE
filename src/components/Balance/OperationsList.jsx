import axios from 'axios'
import React, {useState, useEffect} from 'react'
import useApi from '../../hooks/useApi'
import NewExpense from './NewExpense';

// Category icons
import House from "../../../public/images/home.png"
import Food from "../../../public/images/dish.png"
import Health from "../../../public/images/heartbeat.png"
import Savings from "../../../public/images/piggy-bank.png"
import Other from "../../../public/images/more.png"
import Balance from "/images/balance.png"


const axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };
  

const OperationsList = ({ list, spinner, setEditExpense, setEditBalance }) => {

    const { setRefresh, loggedUser } = useApi()
 
    const handleRemoveExpense = (id) => {
        axios({
            method: "DELETE",
            url: `http://localhost:8888/api/operationsList/${id}`,
            headers: axiosConfig,
            data: JSON.stringify(loggedUser)
        }).then(res => {
          console.log("res");
        }).catch(e => {
          console.log("error");
        })
        setRefresh(true)
    }


  return (
    <>
    <div className='operations_list'>
      {list.length !== 0 ? (
        <>
        <div className='expense_items_titles'>
          <h3>Name</h3>
          <h3>Price</h3>
          <h3>Category</h3>
          <h3 className='operations_time'>Time</h3>
          <h3>Actions</h3>
        </div>
        </>
      ) : <h2>Nothing</h2>}
    {spinner ? (
      list.map(item => (
        <>
        <div 
        className='expense_item'
        key={item.id}
        >
        <p className={item.category === "add_balance" ? "added_balance" : 'added_expense'}>{item.description}</p>
        <h2 className={item.category === "add_balance" ? "added_balance" : 'added_expense'}>$ {(item.total).toFixed(2)}</h2>
        <div className='tooltip'>
          <span className='tooltipText'>{item.category}</span>
        <img 
        src={item.category === "home" ? House :
                  item.category === "savings" ? Savings :
                  item.category === "other" ? Other :
                  item.category === "food" ? Food :
                  item.category === "health" ? Health : 
                  item.category === "add_balance" ? Balance : null
      } alt="" />
      </div>
        <h4 className={item.category === "add_balance" ? "added_balance operations_time" : 'added_expense operations_time'}>{(new Date(item.lastUpdated)).toLocaleDateString('en-US')}</h4>
        <div className='operations_buttons'>
        <button
        className='edit_button'
        onClick={() => {item.category !== 'add_balance' ? setEditExpense(item) : setEditBalance(item)}}
        >Edit</button>
        <button
         className='remove_button'
            onClick={() => handleRemoveExpense(item.id)}
        >Remove</button>
        </div>
        </div>
        </>
    )) ) : null}
    </div>
    </>
  )
}

export default OperationsList