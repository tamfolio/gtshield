import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import Footer from '../../Components/Website/LandingPage/Footer'
import CrimeMapHero from '../../Components/Website/CrimeMap/CrimeMapHero'
import Map from '../../Components/Website/CrimeMap/Map'

function CrimeMap() {
  return (
    <div>
        <Navbar/>
        <CrimeMapHero/>
        <Map/>
        <Footer/>
    </div>
  )
}

export default CrimeMap
