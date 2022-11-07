import React, { useState } from 'react'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
const handleSubmit = () =>{
    const payload = ({
        name,
        email,
        password
    })
    console.log(payload);
    fetch("http://localhost:5000/signup", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res)=> res.json())
        .then((res)=> console.log(res))
}

  return (
    <div>
        <h1>Signup</h1>
        <div>
            <input type="text" placeholder='name' onChange={(e)=>{setName(e.target.value)}} /><br/>
            <input type="email" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} /><br/>
            <input type="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} /><br/>
            <button onClick={handleSubmit}>signup</button>
        </div>
    </div>
  )
}

export default Signup