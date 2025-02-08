import React from 'react'
import AuthContainer from './AuthContainer'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <AuthContainer title="Log In">
        <LoginForm/> 
    </AuthContainer>
  )
}

export default Login