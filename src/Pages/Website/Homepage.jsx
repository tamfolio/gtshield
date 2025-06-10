import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import Hero from '../../Components/Website/LandingPage/Hero'
import Story from '../../Components/Website/LandingPage/Story'
import HowItWorks from '../../Components/Website/LandingPage/HowItWorks'
import Features from '../../Components/Website/LandingPage/Features'
import Testimonials from '../../Components/Website/LandingPage/Testimonials'
import FAQ from '../../Components/Website/LandingPage/FAQ'
import Join from '../../Components/Website/LandingPage/Join'
import Footer from '../../Components/Website/LandingPage/Footer'

function Homepage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Story/>
      <HowItWorks/>
      <Features/>
      <Testimonials/>
      <FAQ/>
      <Join/>
      <Footer/>
    </div>
  )
}

export default Homepage
