import React from 'react'
import { Link } from 'react-router-dom'
import AuthContainer from './AuthContainer'
import LoginForm from './LoginForm'

const Login = ({setUser}) => {
  return (
    <>
      <AuthContainer title="Welcome back!">
          <LoginForm setUser={setUser}/> 
      </AuthContainer>
      <p className='under-auth'>New to BrainLog? <Link to="/register">Create an account</Link></p>
    </>
  )
}

export default Login