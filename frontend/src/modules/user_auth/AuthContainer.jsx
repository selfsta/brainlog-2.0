import React from 'react'

const AuthContainer = (props) => {
  return (
    <section className='authContainer'>
        <h3>{props.title}</h3>
        {props.children}
    </section>
  )
}

export default AuthContainer