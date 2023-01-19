import React from 'react';
import { Link } from 'react-router-dom';

function LoginMessage() {
  return (
    <div>
      <h2>Please login to your account</h2>
      <Link to={'/'}>Login</Link>
    </div>
  )
}

export default LoginMessage
