'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';


const Logo = ({size}) => {
  return (
    <Link href={'/'}>
      <motion.div
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2 }}
      >
        <img
        src='/logo.png'
        alt='logo'
        style={{ width: size, height: 'auto' }}
        />
        </motion.div>
    </Link>
  )
}

export default Logo