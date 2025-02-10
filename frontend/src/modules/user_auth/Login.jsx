import React from 'react'
import AuthContainer from './AuthContainer'
import LoginForm from './LoginForm'

const Login = ({setUser}) => {
  return (
    <AuthContainer title="Welcome back!">
        <LoginForm setUser={setUser}/> 
    </AuthContainer>
  )
}

export default Login