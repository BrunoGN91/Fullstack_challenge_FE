import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useApi from '../hooks/useApi';
import axios from 'axios';
import Eye from "../../public/images/eye.png"
import Hidden from "../../public/images/hidden.png"

const Register = () => {
    const navigate = useNavigate()
    const {users} = useApi();

    const lastId = Object.values(users).map(id => {
        return id.id
    })
   

    const [see, setSee] = useState(false);
    const [resee, setReSee] = useState(false);
    const [user, setUser] = useState({
        email:'',
        password: '',
        balance: 0
    })

    const handleRedirect = (e) => {
        history.push('/')
    }

    const handleSee = (e) => {
        e.preventDefault()
        setSee(!see)
    }
    const handleReSee = (e) => {
        e.preventDefault()
        setReSee(!resee)
    }

    let axiosConfig = {
        headers: {
            'Content-Type' : 'application/json',
            "Accept": "Token",
            "Access-Control-Allow-Origin": "*",
      
        }
      };

    const handleSubmitForm = (e) => {
       e.preventDefault()
        const sendForm = () => {
        let URL_ENDPOINT = "http://localhost:8888/api/apiPost"
        axios({
                method: "POST",
                url: URL_ENDPOINT,
                data: JSON.stringify(user),
                headers: axiosConfig
        }).then(res => {
            return res
                 }).catch(err => console.log("error"))
        }
        sendForm()
        navigate('/')
        
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
            <div className='password'>
                <input type={see ? "text" : "password"} onChange={(e) => setUser({...user, password: e.target.value})} />
                <img onClick={handleSee}className="password_eye" src={!see ? Eye : Hidden} alt="" />
            </div>
        <label htmlFor="">Re-password</label>
        <div className='password'>
        <input type={resee ? "text" : "password"} />
        <img onClick={handleReSee}className="password_eye" src={!resee ? Eye : Hidden} alt="" />
        </div>
        <button type='submit'>Submit</button>
    </form>
    </div>
    </>
  )
}

export default Register