import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useApi from '../hooks/useApi';
import axios from 'axios';
import Eye from "../../public/images/eye.png"
import Hidden from "../../public/images/hidden.png"



let axiosConfig = {
    headers: {
        'Content-Type' : 'application/json',
        "Accept": "Token",
        "Access-Control-Allow-Origin": "*",
  
    }
  };


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
        repassword: '',
        balance: 0
    })
    const [formErrors, setFormErrors] = useState({})
    const [submitForm, setSubmitForm] = useState(false)

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


      
    const validateForm = (values) => {
        const errors = {}
         if(values.email === '') {
           errors.email = "Not a valid email"
         }
       
         if(values.password === '') {
           errors.password = "Password cant be empty"
         }
         if(values.repassword !== values.password) {
            errors.repassword = "Passwords must match"
         }
       
         return errors
       }

    const handleSubmitForm = (e) => {
       e.preventDefault()
       setFormErrors(validateForm(user))
       setSubmitForm(true)
       if(Object.keys(formErrors).length === 0 && submitForm) {
        const sendForm = () => {
            
            axios({
                    method: "POST",
                    url: `${import.meta.env.VITE_API_URL}/apiPost` || 'https://balance-meter.herokuapp.com/api/apiPost',
                    data: JSON.stringify(user),
                    headers: axiosConfig
            }).then(res => {
                return res
                     }).catch(err => console.log("error"))
            }
            sendForm()
            navigate('/')
            setFormErrors({})
            setSubmitForm(false)
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
        <label htmlFor="">Re-password</label>
        <span className='expense_error'>{formErrors.repassword}</span>
        <div className='password'>
        <input type={resee ? "text" : "password"} onChange={(e) => setUser({...user, repassword: e.target.value})} />
        <img onClick={handleReSee}className="password_eye" src={!resee ? Eye : Hidden} alt="" />
        </div>
        <button type='submit'>Submit</button>
    </form>
    </div>
    </>
  )
}

export default Register