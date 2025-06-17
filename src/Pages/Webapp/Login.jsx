import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import SignIn from '../../Components/Webapp/Auth/SignIn'

function Login() {
  return (
    <div>
      <Navbar isAuthenticated={false}/>
      <SignIn/>
    </div>
  )
}

export default Login
