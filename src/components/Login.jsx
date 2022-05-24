import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useApi from '../hooks/useApi';


const axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };


const Login = () => {
    const navigate = useNavigate()
    const [see, setSee] = useState(false);
    const [user, setUser] = useState({
        email:'',
        password: '',
    })
    
    const { setLoggedUser, setLogged, setLoggedNewUser } = useApi()

    const handleSee = (e) => {
        e.preventDefault()
        setSee(!see)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: "http://localhost:8888/api/loginProcess",
            headers: axiosConfig,
            data: JSON.stringify(user)
        }).then(res => {
            
            setLoggedUser(res.data.id)
            setLoggedNewUser(res.data)
            sessionStorage.setItem("token", res.data.id)
            navigate('/balance')
        })
     }
    
  return (
    <>
    <div className='register'>
    <form
    onSubmit={handleSubmitForm}
    className="register_form"
    action=""
    >
        <label htmlFor="" >Email</label>
        <input type="text" onChange={(e) => setUser({...user, email: e.target.value})}/>
        <label htmlFor="">Password</label>
        <input type={see ? "text" : "password"} onChange={(e) => setUser({...user, password: e.target.value})} />

        <button type='submit'>Submit</button>
    </form>
    </div>
    </>
  )
}

export default Login