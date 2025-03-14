import React from 'react'
import Link from 'next/link'
import DailyComponent from './DailyComponent'

const HeroComponent = () => {
  return (
    <section id="homepage" className='flex flex-col font-outfit pt-42 mx-auto items-center min-h-screen text-maintext'>
        <h1 className='text-5xl'>🧠 MindCere - Unlock Your Brain’s Potential 🧠</h1>
        <p className='text-2xl pt-8'>AI-powered insights & tips for a healthier mind. Elevate focus, memory, and mental clarity.</p>

        <DailyComponent />

        <div className='flex mx-auto mt-8'>
          <Link href="#insights" className='bg-buttonbackground rounded-2xl mr-4 p-4 font-outfit lg:text-lg font-bold'>
            Get Started
          </Link> 
          <Link href="#about" className='bg-buttonbackground rounded-2xl p-4 font-outfit lg:text-lg font-bold'>
            Learn More
          </Link>
        </div>
    </section>
  )
}

export default HeroComponent