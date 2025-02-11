import React from 'react'
import { Link } from 'react-router-dom';

const Nav = ({active}) => {
  return (
    <nav className='site-nav'>
        <Link to='/'  className={active === '/' ? 'active-nav' : 'nav-tab'}>Today</Link>
        <Link to='/dashboard' className={active === '/dashboard' ? 'active-nav' : 'nav-tab'}>Dashboard</Link>
    </nav>
  )
}
export default Nav