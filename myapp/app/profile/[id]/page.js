'use client'
import React, { useState } from 'react';
import BookingList from '@/components/BookingList';
import BookingForm from '@/components/BookingForm';
import { signIn, signOut, useSession } from 'next-auth/react';

const ProfilePage = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('myBookings');
  const { data: session } = useSession();

  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col max-w-screen-xl mx-auto'>
        <span className='text-xl font-semibold mb-4'>Hi, {session?.user.name}</span>

        <div className='flex items-center w-full justify-center'>
          <button
            onClick={() => setActiveTab('myBookings')}
            className={`py-2 px-4 focus:outline-none rounded-tl-lg rounded-tr-lg w-full ${
              activeTab === 'myBookings' ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('newRide')}
            className={`py-2 px-4 focus:outline-none rounded-tl-lg rounded-tr-lg w-full ${
              activeTab === 'newRide' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            New Ride
          </button>
        </div>

        <div className='bg-gray-200 border border-t-transparent border-gray-300 p-4 rounded-bl-lg rounded-br-lg'>
          {activeTab === 'myBookings' && <BookingList userId={session?.user?.id} />}
          {activeTab === 'newRide' && <BookingForm />}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
