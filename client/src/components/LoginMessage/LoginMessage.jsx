import React from 'react';
import { Link } from 'react-router-dom';
import './LoginMessage.css'

function LoginMessage() {
  return (
    <div className='login-message'>
      <h1>404 <span style={{display:'inline-block', margin:'20px', transform: 'rotate(90deg)'}}>:(</span>page not found!!</h1>
      <h2>Please login to your account</h2>
      <Link to={'/'}>Login</Link>
    </div>
  )
}

export default LoginMessage
