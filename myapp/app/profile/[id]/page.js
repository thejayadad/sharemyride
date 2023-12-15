'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {signIn, signOut, useSession} from 'next-auth/react'
import CarForm from '@/components/CarForm';

const ProfilePage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });


  return (
    <section className='px-4 py-12'>
        <div className='flex flex-col'>
            <span>Hi {session?.user?.name}</span>
            <CarForm />
        </div>
    </section>
  )
}

export default ProfilePage