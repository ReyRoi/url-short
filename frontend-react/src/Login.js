import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Login.css'
const Login = () => {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const userData = {email,password}
        console.log(userData)

        try{
            const response = await axios.post('https://url-short-backend-sz3y.onrender.com/login',userData,{ withCredentials: true })
            console.log('Signup successful', response.data)

            alert('Login successful')
            navigate('/home')
        }catch(err){
            console.log(err.message)
            alert('login  failed')
        }
    }
  return (
    <div className='login'>
        <h1>Login for url shortener</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email: </label><br></br><br></br>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br><br></br>
        <label htmlFor="">Password: </label><br></br><br></br>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/><br></br><br></br>
        <button type='submit'>Submit</button>
      </form>
      <br></br>
      <button><Link to='/'>Signup</Link></button>
    </div>
  )
}

export default Login
