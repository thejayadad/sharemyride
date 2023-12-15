'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MdLocalTaxi } from 'react-icons/md';

const BookingListItem = ({ booking }) => {
  return (
    <motion.tr
      key={booking._id}
      whileHover={{ scale: 1.03, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className='cursor-pointer'
    >
      <td
      className='px-6 py-4 whitespace-nowrap border'
      >{booking.name}</td>
      <td
     className='px-6 py-4 whitespace-nowrap border'
     >{booking.phone}</td>
      <td
      className='px-6 py-4 whitespace-nowrap border'
     
      >{booking.pickUp}</td>
      <td
      className='px-6 py-4 whitespace-nowrap border'

      >{booking.dropOff}</td>
      <td
     className='px-6 py-4 whitespace-nowrap border'

      >{booking.price}</td>
      <td
      className='px-6 py-4 whitespace-nowrap border'

      >
        <button className="text-blue-500">Update</button>
      </td>
    </motion.tr>
  );
};

const BookingList = ({ userId }) => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        console.log('Fetching user bookings for user ID:', userId);
        const response = await axios.get(`http://localhost:3000/api/booking/${userId}`);
        console.log('Response data:', response.data);

        const bookings = response.data;
        setUserBookings(bookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [userId]);

  console.log('Rendering BookingList with user bookings:', userBookings);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl font-semibold mb-2'>Your Bookings</h2>
          <div className="w-16 h-1 rounded-full bg-orange mb-4"></div>
          {userBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table className="min-w-full border rounded-xl">
            <thead className='cursor-pointer'>
                <tr>
                  <th
                  className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border'
                  >Name</th>
                  <th
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border'
                  >Phone</th>
                  <th
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border'
                  >PickUp</th>
                  <th
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border'
                  >DropOff</th>
                  <th
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border'
                  >Price</th>
                  <th
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border'
                  >Update</th>
                </tr>
              </thead>
              <tbody className=''>
                {userBookings.map((booking) => (
                  <BookingListItem key={booking._id} booking={booking} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingList;
