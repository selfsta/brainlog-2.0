import React from 'react'
import AuthContainer from './AuthContainer'
import RegistrationForm from './RegistrationForm'

const Register = () => {
  return (
    <AuthContainer title="Create Account">
        <RegistrationForm/> 
    </AuthContainer>
  )
}

export default Register
