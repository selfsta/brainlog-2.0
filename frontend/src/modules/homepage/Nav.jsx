import React from 'react'
import { Link } from 'react-router-dom';

const Nav = ({active}) => {
  return (
    <nav className='site-nav'>
        <Link to='/'  className={`nav-tab ${active === '/' ? 'active' : ''}`}>Today</Link>
        <Link to='/dashboard' className={`nav-tab ${active === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
    </nav>
  )
}
export default Nav