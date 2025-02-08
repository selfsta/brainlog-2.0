import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider} from 'react-auth-kit';
import { RequireAuth } from 'react-auth-kit';
import './App.css';
import EntryForm from './modules/entry/EntryForm';
import Register from './modules/user_auth/Register'
import Login from './modules/user_auth/Login';
import Forgot from './modules/user_auth/Forgot';
function App() {
  return (
    <>
      <header>
      <h1>BrainLog</h1>
      </header>
      <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
      >
        <Router>
            <main>
                <section>
                    <Routes>
                      <Route path={'/'} element={
                        <RequireAuth loginPath={'/login'}>
                          <EntryForm/>
                        </RequireAuth>
                      }/>
                      <Route path="/register" element={<Register/>}></Route>
                      <Route path="/login" element={<Login/>}></Route>
                      <Route path="/forgot" element={<Forgot/>}></Route>
                    </Routes>
                </section>
            </main>
        </Router>
      </AuthProvider>
      <footer>
      <p>BrainLog</p>
          <a href="/">Home</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/forgot">Forgot Password</a>
          <p>&copy; Selfsta {new Date().getFullYear()}</p> 
      </footer>
    </>
  )
}

export default App
