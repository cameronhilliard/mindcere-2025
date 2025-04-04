import React from 'react'
import Link from 'next/link'
import DailyComponent from './DailyComponent'

const HeroComponent = () => {
  return (
    <section id="homepage" className='flex flex-col font-outfit lg:pt-42 pt-30  mx-auto items-center min-h-screen text-maintext'>
        <h1 className='lg:text-5xl text-4xl font-outfit'>MindCere</h1>
        <p className='lg:text-2xl text-xl px-5 text-center pt-8 mx-auto'>AI-powered insights & tips for a healthier mind. Elevate focus, memory, and mental clarity.</p>

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