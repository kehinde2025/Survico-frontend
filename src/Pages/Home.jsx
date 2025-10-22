import React from 'react'
import Hero from '../components/Hero'
import AboutSection from '../components/About'
import HowItWorks from '../components/HowItWorks'
import WaysToEarn from '../components/WaysToEarn'
import Testimonials from '../components/Testimony'
import FinalCTA from '../components/CallToAction'

export default function Home() {
    return (
        <div className='bg-[#140932] '>
            <Hero />
            <AboutSection />
            <HowItWorks />
            <WaysToEarn />
            <Testimonials />
            <FinalCTA />
        </div>
    )
}
