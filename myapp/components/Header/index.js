'use client'
import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <section className='px-4 py-2'>
        <div className='mx-auto max-w-screen-xl p-6'>
    <div className='px-4 py-6 mx-auto'>
    <h2 className="text-xs text-center text-primary tracking-widest font-medium title-font mb-1 cursor-pointer">SHARE MY RIDE</h2>
        <h1 className='sm:text-3xl text-2xl font-medium title-font text-gray-900 text-center mt-4 mb-4 cursor-pointer'>Number 1 Peer RideSharing Site</h1>
        <p
        className='lg:w-2/3 mx-auto leading-relaxed text-gray-600 cursor-pointer text-center'
        >Welcome to 'Share My Ride' – where the journey becomes an adventure! Embark on a seamless and exhilarating ride-sharing experience with our app</p>
    </div>
         <SearchBar  />
        </div>
    </section>
  )
}

export default Header