import React from 'react';
import { Link } from 'react-router-dom';
import './LoginMessage.css'

function LoginMessage() {
  return (
    <div className='login-message'>
      <h2>Please login to your account</h2>
      <Link to={'/'}>Login</Link>
    </div>
  )
}

export default LoginMessage
