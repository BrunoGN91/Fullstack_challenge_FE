import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useApi from '../hooks/useApi';
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    console.log(history);
    const {users} = useApi();

    const lastId = Object.values(users).map(id => {
        return id.id
    })
   

    const [see, setSee] = useState(false);
    const [resee, setReSee] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
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
        setSee(!resee)
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
        <input type={see ? "text" : "password"} onChange={(e) => setUser({...user, password: e.target.value})} />
        <label htmlFor="">Repassword</label>
        <input type="password" />
        <button type='submit'>Submit</button>
    </form>
    </div>
    </>
  )
}

export default Register