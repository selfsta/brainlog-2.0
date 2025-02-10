import { React, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import './App.css';
import EntryForm from './modules/entry/EntryForm';
import Register from './modules/user_auth/Register'
import Login from './modules/user_auth/Login';
import Forgot from './modules/user_auth/Forgot';
import FooterLinks from './modules/homepage/FooterLinks';
import Nav from './modules/homepage/Nav';

function App() {
  const [user, setUser] = useState([])
  const [_u_ID, _name] = user.length > 0 ? [user[0], user[1]] : ['', '']
  
  const location = useLocation()
  const active = location.pathname

  return (
    <>
      <header>
      <Link to="/"><h1>BrainLog</h1></Link>
      {_u_ID === '' ? <p>Easily log your daily mental well-being and track your daily progress.</p> : <Nav active={active}/>}
      
      </header>
            <main>
                <section>
                    <Routes>
                      <Route path={'/'} element={
                        <RequireAuth loginPath={'/login'}>
                          <EntryForm _u_ID={_u_ID} _name={_name} />
                        </RequireAuth>
                      }/>
                      <Route path="/register" element={<Register/>}></Route>
                      <Route path="/login" element={<Login setUser={setUser} />}></Route>
                      <Route path="/forgot" element={<Forgot/>}></Route>
                    </Routes>
                </section>
            </main>
      <footer>
        <p>BrainLog</p>
        <FooterLinks logged={_u_ID} setUser={setUser}/>
        <p>&copy; Selfsta {new Date().getFullYear()}</p> 
      </footer>
    </>
  )
}

export default App
