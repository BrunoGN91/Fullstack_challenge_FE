import axios from 'axios'
import React, {useState, useEffect} from 'react'
import useApi from '../../hooks/useApi'




const axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };
  

const OperationsList = ({ list, spinner }) => {

    const { setRefresh } = useApi()
 
    const handleRemoveExpense = (id) => {
        axios({
            method: "DELETE",
            url: `http://localhost:8888/api/operationsList/${id}`,
            headers: axiosConfig
        }).then(res => {
          console.log(res);
        }).catch(e => {
          console.log("error");
        })
        setRefresh(true)
    }

    const handleEditExpense = async () => {

    } 
console.log(list);
  return (
    <>
    <div className='operations_list'>
      {list.length !== 0 ? (
        <>
        <div className='expense_items_titles'>
          <h2>Name</h2>
          <h3>Price</h3>
          <h3>Time</h3>
          <h4>Actions</h4>
        </div>
        </>
      ) : <h2>Nothing</h2>}
    {spinner ? (
      list.map(item => (
        <>
        <div className='expense_item'>
        <p>{item.description}</p>
        <h2>$ {(item.total).toFixed(2)}</h2>
        <h4>{(new Date(item.lastUpdated)).toLocaleDateString('en-US')}</h4>
        <button
        className='edit_button'
        >Edit</button>
        <button
         className='remove_button'
            onClick={() => handleRemoveExpense(item.id)}
        >Remove</button>
        </div>
        </>
    )) ) : null}
    </div>
    </>
  )
}

export default OperationsList