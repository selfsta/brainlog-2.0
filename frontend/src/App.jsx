import React, { use } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import { RequireAuth, useSignOut } from 'react-auth-kit';

import './App.css';
import EntryForm from './modules/entry/EntryForm';
import Register from './modules/user_auth/Register'
import Login from './modules/user_auth/Login';
import Forgot from './modules/user_auth/Forgot';

function App() {
  const _token = document.cookie;
  let _u_ID = ''
  if (_token) {
    _u_ID = _token.match(/%22_id%22:%22([\da-f]+)%22/)[1];
  }
  
  const signOut = useSignOut()
  const redirect = useNavigate()
  const logOut = () => {
    signOut();
    redirect('/')
  }
  return (
    <>
      <header>
      <h1>BrainLog</h1>
      </header>
            <main>
                <section>
                    <Routes>
                      <Route path={'/'} element={
                        <RequireAuth loginPath={'/login'}>
                          <EntryForm _u_ID={_u_ID} />
                        </RequireAuth>
                      }/>
                      <Route path="/register" element={<Register/>}></Route>
                      <Route path="/login" element={<Login/>}></Route>
                      <Route path="/forgot" element={<Forgot/>}></Route>
                    </Routes>
                </section>
            </main>
      <footer>
      <p>BrainLog</p>
          <a href="/">Home</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/forgot">Forgot Password</a>
          <button onClick={logOut}>Sign Out</button>
          <p>&copy; Selfsta {new Date().getFullYear()}</p> 
      </footer>
    </>
  )
}

export default App
