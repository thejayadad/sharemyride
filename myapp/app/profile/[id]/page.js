'use client'
import React, { useState } from 'react';
import BookingList from '@/components/BookingList';
import BookingForm from '@/components/BookingForm';
import { signIn, signOut, useSession } from 'next-auth/react';
import CarList from '@/components/CarList';
import CarForm from '@/components/CarForm';

const ProfilePage = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('myBookings');
  const { data: session } = useSession();

  if(!session){
    return <h2>Not Authorized</h2>
  }

  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col max-w-screen-xl mx-auto'>
        <span className='text-xl font-semibold mb-4'>Hi, {session?.user.name}</span>

        <div className='flex items-center w-full justify-center'>
        <button
            onClick={() => setActiveTab('allRide')}
            className={`py-2 px-4 focus:outline-none rounded-tl-3xl rounded-tr-3xl w-full ${
              activeTab === 'allRide' ? 'bg-white text-liteGray' : 'bg-gray-200 text-gray-800'
            }`}
          >
            All Rides
          </button>
          <button
            onClick={() => setActiveTab('myBookings')}
            className={`py-2 px-4 focus:outline-none rounded-tl-3xl rounded-tr-3xl w-full ${
              activeTab === 'myBookings' ? 'bg-white text-liteGray' : 'bg-gray-200 text-gray-800'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('newRide')}
            className={`py-2 px-4 focus:outline-none rounded-tl-3xl rounded-tr-3xl w-full ${
              activeTab === 'newRide' ? 'bg-white text-liteGray' : 'bg-gray-200 text-gray-800'
            }`}
          >
            New Ride
          </button>
          <button
            onClick={() => setActiveTab('newBooking')}
            className={`py-2 px-4 focus:outline-none rounded-tl-3xl rounded-tr-3xl w-full ${
              activeTab === 'newRide' ? 'bg-liteGray text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            New Booking
          </button>
    
        </div>

        <div className='bg-white border  border-t-transparent border-gray-300 p-4 rounded-bl-lg rounded-br-lg'>
        {activeTab === 'allRide' && <CarList />}
        {activeTab === 'newRide' && <CarForm />}
          {activeTab === 'myBookings' && <BookingList userId={session?.user?.id} />}
          {activeTab === 'newBooking' && <BookingForm />}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
