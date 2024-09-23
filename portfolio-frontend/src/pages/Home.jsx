import React from 'react'
import Hero from './sub-components/Hero'
import Timeline from './sub-components/Timeline'
import Skills from './sub-components/Skills'
import Portfolio from './sub-components/Portfolio'
import Software from './sub-components/Software'
import Contact from "./sub-components/Contact"
const Home = () => {
  return (
    <article className="portfolio px-5 mt-10 sm:mt-14 md:mt-10 lg:mt-18 xl:mt-20 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Hero/>
      <Timeline/>
      <Skills />
      <Portfolio />
      <Software />
      <Contact/>
    </article>
    
    
  )
}

export default Home
