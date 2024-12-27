import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Signup.css'
const Signup = () => {
    const[username,setUsername] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const userData = {username,email,password}
        console.log(userData)

        try{
            const response = await axios.post('http://localhost:5000/api/users/signup',userData,{ withCredentials: true })
            console.log('Signup successful', response.data)

            alert('signup successful')
            navigate('/login')
        }catch(err){
            console.log(err.message)
            alert('signup  failed')
        }
    }
  return (
    <div className='signup'>
        <h1>Signup for url shortener</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username: </label><br></br><br></br>
        <input type="text" value={username}  onChange={(e)=>setUsername(e.target.value)}/><br></br><br></br>
        <label htmlFor="">Email: </label><br></br><br></br>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br><br></br>
        <label htmlFor="">Password: </label><br></br><br></br>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/><br></br><br></br>
        <button type='submit'>Submit</button>
      </form>
      <br></br>
      <button><Link to='/login'>Login</Link></button>
    </div>
  )
}

export default Signup
