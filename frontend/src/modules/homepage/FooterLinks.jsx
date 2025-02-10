import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';



const FooterLinks = ({logged, setUser}) => {
  const loggedOutLinks = [
    ['Log In', '/login'],
    ['Register', '/register'],
    ['Forgot Password', '/forgot']
  ]
  const loggedInLinks = [
    ['Home', '/'],
    ['Dashboard', '/dashboard'],
    ['Help', '/help']
  ]
  
    const signOut = useSignOut()
    const redirect = useNavigate()
    
    const logOut = (e) => {
      signOut();
      redirect('/login')
      {setUser([])}
    }

    const Links = logged === '' ? loggedOutLinks : loggedInLinks

  return (
    <>
      {Links.map(link => <Link className='footer-link' to={link[1]} key={link[0]}>{link[0]}</Link>)}
      {logged === '' ? null : <Link className='footer-link' to='#' onClick={logOut}>Sign Out</Link>}
    </>
  )
}

export default FooterLinks
