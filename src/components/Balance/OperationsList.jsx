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

const OperationsList = ({refresh, setRefresh}) => {

    const {  } = useApi()
    const [list, setList] = useState([])
    const logged = sessionStorage.getItem("token")

    useEffect(() => {
        if(logged !== null) {
            axios({
                method: "POST",
                url: "http://localhost:8888/api/setOperationList",
                headers: axiosConfig,
                data: JSON.stringify(logged)
            }).then(res => {
                setList(res.data)
            })
            setRefresh(false)
        }
      
    },[refresh])


  return (
    <>
    <div className='operations_list'>
    {list.map(item => (
        <>
        <p>{item.description}</p>
        <h2>{item.total}</h2>
        </>
    ))}
    </div>
    </>
  )
}

export default OperationsList