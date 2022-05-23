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

const OperationsList = () => {

    const { loggedUser } = useApi()
    const [list, setList] = useState([])

    useEffect(() => {
        axios({
            method: "POST",
            url: "http://localhost:8888/api/setOperationList",
            headers: axiosConfig,
            data: JSON.stringify(loggedUser)
        }).then(res => {
            setList(res.data)
        })
    },[])
console.log(list);
  return (
    <>
    {list.map(item => (
        <>
        <div>
            {item.description}
            {item.total}
        </div>
        </>
    ))}
    </>
  )
}

export default OperationsList