'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {signIn, signOut, useSession} from 'next-auth/react'

const ProfilePage = () => {
    const { data: session } = useSession();

  return (
    <section className='px-4 py-12'>
        <div className='flex flex-col'>
            <span>Hi {session.user?.name}</span>
        </div>
    </section>
  )
}

export default ProfilePage