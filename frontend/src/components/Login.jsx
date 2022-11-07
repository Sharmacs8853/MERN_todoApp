import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () =>{
      const payload = {
          email,
          password
      }
      console.log(payload);
      fetch("http://localhost:5000/login", {
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify(payload)
      })
      .then((res)=> res.json())
      .then((res)=> {
        localStorage.setItem("token", res.token);
        console.log(res);
      })
  }
  return (
      <div>
          <h1>login</h1>
          <div>
              <br/><input type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
              <br/><input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
              <br/><button onClick={handleSubmit}>Login</button>
          </div>
      </div>
  )
}

export default Login