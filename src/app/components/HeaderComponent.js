'use client'
import Link from 'next/link'
import React from 'react'
import Menu from './Menu'

const HeaderComponent = () => {
  return (
    <header className='flex flex-row mx-auto justify-between mt-4 sticky top-0'>
        <h1 className='text-maintext mt-8 text-2xl  ml-12 font-outfit pb-8'>MindCere</h1>
        <nav className='mt-8 mr-12'>
        {/* <ul className='flex flex-row right mt-8 text-lg text-maintext font-outfit'>
            <Link className='pr-6' href="#home">Home</Link>
            <Link className='pr-6' href="#insights">Insights</Link>
            <Link className='pr-6' href="#about">About</Link>
        </ul> */}
          <Menu />
        </nav>
    </header>
  )
}

export default HeaderComponent