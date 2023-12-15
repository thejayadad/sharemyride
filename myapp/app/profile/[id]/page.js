'use client'
import React, { useState } from 'react';
import BookingList from '@/components/BookingList';
import BookingForm from '@/components/BookingForm';
import {signIn, signOut, useSession} from 'next-auth/react'


const ProfilePage = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('myBookings');
  const { data: session } = useSession();

  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col'>
        <span className='text-xl font-semibold mb-4'>Hi, User</span>

        <div className='flex space-x-4 mb-6'>
          <button
            onClick={() => setActiveTab('myBookings')}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === 'myBookings' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('newRide')}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === 'newRide' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            New Ride
          </button>
        </div>

        {activeTab === 'myBookings' && <BookingList userId={session?.user?.id} />}
        {activeTab === 'newRide' && <BookingForm />}
      </div>
    </section>
  );
};

export default ProfilePage;




