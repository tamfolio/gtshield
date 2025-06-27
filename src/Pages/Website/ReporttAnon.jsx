import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import Footer from '../../Components/Website/LandingPage/Footer'
import IncidentReportingSystem from '../../Components/Website/Report/IncidentReportingSystem'

function ReporttAnon() {

  const isUserAuthenticated = localStorage?.getItem('isAuthenticated') === 'true';
  console.log(isUserAuthenticated)
  return (
    <div>
      <Navbar isAuthenticated={isUserAuthenticated}/>
      <IncidentReportingSystem isAuthenticated={isUserAuthenticated}/>
      <Footer/>
    </div>
  )
}

export default ReporttAnon
