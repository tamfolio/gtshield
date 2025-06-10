import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import Footer from '../../Components/Website/LandingPage/Footer'
import NewsHero from '../../Components/Website/News/NewsHero'
import NewsBlog from '../../Components/Website/News/NewsBlog'
import GetApp from '../../Components/Website/News/GetApp'

function News() {
  return (
    <div>
      <Navbar/>
      <NewsHero/>
      <NewsBlog/>
      <GetApp/>
      <Footer/>
    </div>
  )
}

export default News
