'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'


const BookingForm = ({ carId }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberSeats, setNumberSeats] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          place: carId,
          creator: session.user.id,
          pickUp: new Date(checkIn),
          dropOff: new Date(checkOut),
          name,
          phone,
          price: 0, 
        }),
      });

      if (!res.ok) {
        throw new Error('Error occurred while booking');
      }
      router.push(`/`)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Additional logic or side effects can go here
    // For example, fetch car details using carId if needed
  }, [carId]);

  return (
    <div className='max-w-screen-xl mx-auto'>
      <form onSubmit={handleSubmit}
      className='flex flex-col'
      >
        {/* Your form fields go here */}
        <label htmlFor='checkIn'>Check In:</label>
        <input type='date' id='checkIn' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />

        <label htmlFor='checkOut'>Check Out:</label>
        <input type='date' id='checkOut' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

        <label htmlFor='numberSeats'>Number of Seats:</label>
        <input type='number' id='numberSeats' value={numberSeats} onChange={(e) => setNumberSeats(e.target.value)} />

        <label htmlFor='name'>Name:</label>
        <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor='phone'>Phone:</label>
        <input type='text' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />

        <button type='submit'>Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
