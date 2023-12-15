'use client'
import React from 'react';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';

const tooltipVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const AuthLinks = () => {
  const { data: session } = useSession();

  return (
    <div className='flex items-center relative'>
      {session ? (
        <div className='relative'>
          <motion.div
            whileHover='visible'
            whileTap='hidden'
            variants={tooltipVariants}
            initial='hidden'
            animate='hidden'
            className='absolute  bg-primary text-white px-4 py-12 rounded-md text-sm top-4 right-2 whitespace cursor-pointer'
          >
           <div className='flex flex-col gap-4'>
           <span>{session.user.email}</span>
            <Link href={`/profile/${session.user.id}`}>Profile</Link>
            <span onClick={signOut}>LogOut</span>
           </div>
          </motion.div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => signOut()} 
          className='focus:outline-none'
          >
            <FiUser className='text-3xl  text-gray-400' />
          </motion.button>
        </div>
      ) : (
        <div className='relative'>
          <motion.div
            whileHover='visible'
            whileTap='hidden'
            variants={tooltipVariants}
            initial='hidden'
            animate='hidden'
            className='absolute  bg-primary text-white px-4 py-8 rounded-md text-sm top-4 right-2 whitespac cursor-pointer'
          >
            <button onClick={signIn}>LogIn</button>
          </motion.div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => signOut()} 
          className='focus:outline-none'
          >
            <FiUser className='text-3xl border text-gray-400' />
          </motion.button>
          </div>
      )}
    </div>
  );
};

export default AuthLinks;
