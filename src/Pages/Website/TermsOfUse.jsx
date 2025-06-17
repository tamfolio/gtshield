import React from 'react'
import Footer from '../../Components/Website/LandingPage/Footer'
import Navbar from '../../Components/Website/Navbar'
import TermsOfUseContent from '../../Components/Website/LandingPage/TermsOfUse'

function TermsOfUse() {
  return (
    <div>
      <Navbar isAuthenticated={false}/>
      <TermsOfUseContent/>
      <Footer/>
    </div>
  )
}

export default TermsOfUse
