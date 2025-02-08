import React from 'react'
import AuthContainer from './AuthContainer'
import ForgotForm from './ForgotForm'

const Forgot = () => {
  return (
    <AuthContainer title="Reset Password">
        <ForgotForm/> 
    </AuthContainer>
  )
}

export default Forgot