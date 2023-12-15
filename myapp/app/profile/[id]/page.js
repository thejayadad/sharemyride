'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import BookingList from '@/components/BookingList';

const ProfilePage = ({ userId}) => {
  const { data: session } = useSession({ required: true });


  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col'>
        <span>Hi {session?.user?.name}</span>
        <BookingList userId={session?.user?.id} />
      
      </div>
    </section>
  );
};

export default ProfilePage;
