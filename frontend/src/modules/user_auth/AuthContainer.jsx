import React from 'react'

const AuthContainer = ({title, children}) => {
  return (
    <section className='authContainer'>
        <h3 className='auth-title'>{title}</h3>
        {children}
    </section>
  )
}

export default AuthContainer