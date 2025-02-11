import React from 'react'
import { Link } from 'react-router-dom'
import AuthContainer from './AuthContainer'
import ForgotForm from './ForgotForm'

const Forgot = () => {
  return (
    <>
      <AuthContainer title="Reset Password">
          <ForgotForm/> 
      </AuthContainer>
      <p className='under-auth'><Link to="/login">Log In</Link></p>
    </>
  )
}

export default Forgot