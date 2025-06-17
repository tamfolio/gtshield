import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import Footer from '../../Components/Website/LandingPage/Footer'
import ErrorPageDetails from '../../Components/Website/LandingPage/ErrorPage'

function ErrorPage() {
  return (
    <div>
     <Navbar isAuthenticated={false}/>
      <ErrorPageDetails/>
      <Footer/>
    </div>
  )
}

export default ErrorPage
