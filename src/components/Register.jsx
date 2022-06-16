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
    const [repeat, setRepeat] = useState({})

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


      
    const validateForm = async (e) => {
        e.preventDefault()
        try {
                const errors = {}
                if(user.email === '') {
                  errors.email = "Not a valid email"
                }
              
                if(user.password === '') {
                  errors.password = "Password cant be empty"
                }
                if(user.repassword !== user.password) {
                   errors.repassword = "Passwords must match"
                }
                setFormErrors(errors)
            if(Object.keys(errors).length === 0) {
            const data = await axios({
                                        method: "POST",
                                        url: `${import.meta.env.VITE_API_URL}/apiPost`,
                                        data: JSON.stringify(user),
                                        headers: axiosConfig
                                    })
                    if(data.data === "duplicate") {
                        return setRepeat(data)
                     } else {
                        return navigate('/')
                     }
                     
                } 
        } catch (error) {
            console.log("error in reg");
        }
       }

    const handleSubmitForm = (e) => {
       e.preventDefault()
       setFormErrors(validateForm(user))
    
       }
      

  return (
    <>
    <div className='register'>
    <form
    onSubmit={validateForm}
    className="register_form"
    action=""
    >
        <label htmlFor="" >Email</label>
        <span className='expense_error'>{formErrors.email}</span>
       {Object.keys(repeat).length !== 0 ? ( <span className='expense_error'>Email already exists</span> ) : null}

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