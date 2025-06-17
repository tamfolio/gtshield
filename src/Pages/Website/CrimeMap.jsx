import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import Footer from '../../Components/Website/LandingPage/Footer'
import CrimeMapHero from '../../Components/Website/CrimeMap/CrimeMapHero'
import Map from '../../Components/Website/CrimeMap/Map'

function CrimeMap() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log("isAuthenticated:", isAuthenticated);

  return (
    <div>
        <Navbar isAuthenticated={isAuthenticated} />
        <CrimeMapHero />
        <Map />
        <Footer />
    </div>
  )
}

export default CrimeMap;
