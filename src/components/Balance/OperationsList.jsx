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
  

const OperationsList = ({ list }) => {

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

  return (
    <>
    <div className='operations_list'>
    {list.map(item => (
        <>
        <div className='expense_item'>
        <p>{item.description}</p>
        <h2>{item.total}</h2>
        <h3
        
        >Edit</h3>
        <button
            onClick={() => handleRemoveExpense(item.id)}
        >Remove</button>
        </div>
        </>
    ))}
    </div>
    </>
  )
}

export default OperationsList