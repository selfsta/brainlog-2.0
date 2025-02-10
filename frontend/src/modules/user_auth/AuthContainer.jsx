import React from 'react'

const AuthContainer = ({title, children}) => {
  return (
    <section className='authContainer'>
        <h3>{title}</h3>
        {children}
    </section>
  )
}

export default AuthContainer