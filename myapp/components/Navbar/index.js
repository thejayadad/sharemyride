'use client'
import Link from 'next/link'
import React from 'react'
import AuthLinks from './AuthLinks'

const Navbar = () => {
  return (
    <header className='px-4 py-12'>
        <nav className='flex justify-between mx-auto max-w-screen-xl'>
        <Link href={'/'}>Logo</Link>
        <AuthLinks />
        </nav>
    </header>
  )
}

export default Navbar