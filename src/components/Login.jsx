import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useApi from '../hooks/useApi';
import Eye from "../../public/images/eye.png"
import Hidden from "../../public/images/hidden.png"




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
    const [formErrors, setFormErrors] = useState({})
   
    
    const { setLoggedUser, setLogged, setLoggedNewUser, setLoggedOut } = useApi()

    const handleSee = (e) => {
        e.preventDefault()
        setSee(!see)
    }

    const validateForm = (values) => {
        const errors = {}
         if(values.email === '') {
           errors.email = "Not a valid email"
         }
       
         if(values.password === '') {
           errors.password = "not a valid password"
         }
       
         return errors
       }

    const handleSubmitForm = async (e)  => {
        try {
            e.preventDefault()
            setFormErrors(validateForm(user))
            const loginSend = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_API_URL}/loginProcess`, //  'https://balance-meter.herokuapp.com/api/loginProcess'
                headers: axiosConfig,
                data: JSON.stringify(user)
            })
            setLoggedUser(loginSend.data.id)
            setLoggedNewUser(loginSend.data)
            sessionStorage.setItem("token", loginSend.data.id)
            setLoggedOut(true)
            navigate('/balance')
            
        } catch (error) {
            
        }
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
        <span className='expense_error'>{formErrors.email}</span>
        <input type="text" onChange={(e) => setUser({...user, email: e.target.value})}/>
        <label htmlFor="">Password</label>
        <span className='expense_error'>{formErrors.password}</span>
        <div className='password'>
        <input type={see ? "text" : "password"} onChange={(e) => setUser({...user, password: e.target.value})} />
        <img onClick={handleSee}className="password_eye" src={!see ? Eye : Hidden} alt="" />
        </div>

        <button type='submit'>Submit</button>
    </form>
    </div>
    </>
  )
}

export default Login