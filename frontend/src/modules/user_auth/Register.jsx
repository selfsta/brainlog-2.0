import React from 'react'
import { Link } from 'react-router-dom'
import AuthContainer from './AuthContainer'
import RegistrationForm from './RegistrationForm'

const Register = () => {
  return (
    <>
      <AuthContainer title="Create Account">
      
          <RegistrationForm/> 
      </AuthContainer>
      <p className='under-auth'><Link to="/forgot">Forgot Password?</Link></p>
    </>
  )
}

export default Register
