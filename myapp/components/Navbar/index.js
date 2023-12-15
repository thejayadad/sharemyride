'use client'
import Link from 'next/link'
import React from 'react'
import AuthLinks from './AuthLinks'
import Logo from '../Logo/Logo'

const Navbar = () => {
  return (
    <header className='px-4 py-12'>
        <nav className='flex justify-between mx-auto max-w-screen-xl'>
        <Logo size={100} />
        <AuthLinks />
        </nav>
    </header>
  )
}

export default Navbar